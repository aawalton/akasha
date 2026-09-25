import { expect, mock, test } from "bun:test"
import type { Valued } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const SECRET = "the-one-relay-secret-this-module-test-carries-on"

const ROOT = "a-checkout-standing-in-for-the-one-a-service-reads"

const SERVED_BY = "service-workstation/a-relay-invented-for-this-test"

const FIRST_PAGE = "probe/first/first.readout.ts"

const SECOND_PAGE = "probe/second/second.readout.ts"

const UNPLACED_PAGE = "probe/unplaced/unplaced.readout.ts"

const FIRST_SITE = "https://first.invalid"

const SECOND_SITE = "https://second.invalid"

const TOOK_AT = "2026-09-11T00:00:00.000Z"

const NAMED: readonly Valued[] = [
  { path: FIRST_PAGE, value: { sites: [FIRST_SITE, SECOND_SITE] } },
  { path: SECOND_PAGE, value: { sites: [SECOND_SITE] } },
]

const CARRIED: string[][] = []

const ASKED: string[][] = []

const SAID: string[] = []

const FAULTED: string[] = []

let checkouts = 0

let unplaced = false

let refusing: string | null = null

const reading = await import(
  "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
)

const relay = await import("akasha/alan/harness/readout/modules/relay/readout-relay.module.code.ts")

const checkout = await import(
  "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-checkout/service-checkout.module.code.ts"
)

mock.module(
  "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-checkout/service-checkout.module.code.ts",
  () => ({
    ...checkout,
    checkoutAt: () => {
      checkouts += 1
      return ROOT
    },
  })
)

mock.module("akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts", () => ({
  ...reading,
  readoutsServedBy: (root: string, servedBy: string): readonly Valued[] => {
    ASKED.push([root, servedBy])
    if (servedBy !== SERVED_BY) return []
    return unplaced ? [{ path: UNPLACED_PAGE, value: {} }, ...NAMED] : NAMED
  },
}))

mock.module("akasha/alan/harness/readout/modules/relay/readout-relay.module.code.ts", () => ({
  ...relay,
  sitesCarriedTo: (_root: string, value: Readonly<Record<string, unknown>>) => {
    const sites = value.sites
    if (!Array.isArray(sites)) throw new Error(`${UNPLACED_PAGE} names a site that is nowhere`)
    return sites
  },
  carryReadingBeside: (root: string, page: string, to: string, secret: string) => {
    if (to === refusing) return Promise.reject(new Error(`${to} answered 500`))
    CARRIED.push([root, page, to, secret])
    return Promise.resolve(relay.readingCarried(TOOK_AT, to))
  },
}))

const carrying = await import(
  "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
)

const ran = async (servedBy: string = SERVED_BY): Promise<undefined> => {
  CARRIED.length = 0
  ASKED.length = 0
  SAID.length = 0
  FAULTED.length = 0
  checkouts = 0
  process.env[relay.RELAY_SECRET_NAME] = SECRET
  const saidWas = process.stdout.write
  const faultedWas = process.stderr.write
  process.stdout.write = ((line: string): boolean => {
    SAID.push(line)
    return true
  }) as typeof process.stdout.write
  process.stderr.write = ((line: string): boolean => {
    FAULTED.push(line)
    return true
  }) as typeof process.stderr.write
  try {
    await carrying.carryReadingsServedBy(servedBy)
  } finally {
    process.stdout.write = saidWas
    process.stderr.write = faultedWas
  }
  return undefined
}

const carried = (): readonly string[][] => CARRIED.map((one) => [one[1] ?? "", one[2] ?? ""])

test("each readout naming what the run serves is carried to each site its page names, in order", async () => {
  unplaced = false
  refusing = null
  await ran()
  expect(carried()).toEqual([
    [FIRST_PAGE, FIRST_SITE],
    [FIRST_PAGE, SECOND_SITE],
    [SECOND_PAGE, SECOND_SITE],
  ])
})

test("the readouts are asked of the checkout under the name the run is handed", async () => {
  unplaced = false
  refusing = null
  await ran()
  expect(ASKED).toEqual([[ROOT, SERVED_BY]])
})

test("a carry is handed the checkout, the readout's page and the secret", async () => {
  unplaced = false
  refusing = null
  await ran()
  expect(CARRIED[0]).toEqual([ROOT, FIRST_PAGE, FIRST_SITE, SECRET])
})

test("the checkout is asked for once however many readouts are carried", async () => {
  unplaced = false
  refusing = null
  await ran()
  expect(checkouts).toBe(1)
})

test("a carry that lands is said where the run's output goes", async () => {
  unplaced = false
  refusing = null
  await ran()
  expect(SAID).toEqual([
    `${relay.readingCarried(TOOK_AT, FIRST_SITE)}\n`,
    `${relay.readingCarried(TOOK_AT, SECOND_SITE)}\n`,
    `${relay.readingCarried(TOOK_AT, SECOND_SITE)}\n`,
  ])
  expect(FAULTED).toEqual([])
})

test("a readout whose sites cannot be read costs its own carries rather than the rest", async () => {
  unplaced = true
  refusing = null
  await ran()
  expect(carried().length).toBe(3)
  expect(FAULTED).toEqual([`${UNPLACED_PAGE} names a site that is nowhere\n`])
})

test("a site that refuses a carry costs that carry rather than the rest", async () => {
  unplaced = false
  refusing = FIRST_SITE
  await ran()
  expect(carried()).toEqual([
    [FIRST_PAGE, SECOND_SITE],
    [SECOND_PAGE, SECOND_SITE],
  ])
  expect(FAULTED).toEqual([`${FIRST_SITE} answered 500\n`])
})

test("what no readout names as serving it carries nothing and says nothing", async () => {
  unplaced = false
  refusing = null
  await ran("service-workstation/a-relay-no-readout-names")
  expect(CARRIED).toEqual([])
  expect(SAID).toEqual([])
  expect(FAULTED).toEqual([])
})

test("no secret to carry on throws rather than carrying part of the readouts", async () => {
  unplaced = false
  refusing = null
  CARRIED.length = 0
  checkouts = 0
  delete process.env[relay.RELAY_SECRET_NAME]
  await expect(carrying.carryReadingsServedBy(SERVED_BY)).rejects.toThrow(relay.RELAY_SECRET_NAME)
  expect(CARRIED).toEqual([])
  expect(checkouts).toBe(0)
})

test("nothing here ends the process, so a run refused throughout still hands back", async () => {
  const ended: number[] = []
  const endingWas = process.exit
  process.exit = ((status?: number): never => {
    ended.push(status ?? 0)
    return undefined as never
  }) as typeof process.exit
  unplaced = true
  refusing = SECOND_SITE
  try {
    await ran()
  } finally {
    process.exit = endingWas
  }
  expect(ended).toEqual([])
  expect(carried()).toEqual([[FIRST_PAGE, FIRST_SITE]])
  expect(FAULTED.length).toBe(3)
})
