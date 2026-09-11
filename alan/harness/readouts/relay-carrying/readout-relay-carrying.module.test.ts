import { expect, mock, test } from "bun:test"
import type { Carry } from "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"

const SECRET = "the-one-relay-secret-this-module-test-carries-on"

const ROOT = "a-checkout-standing-in-for-the-one-a-service-reads"

const KEPT_AT = "-is-where-this-test-alone-keeps-that-point"

const FIRST_POINT = "readout/a-point-invented-for-this-test"

const SECOND_POINT = "readout/a-second-point-invented-for-this-test"

const FIRST_SITE = "https://first.invalid"

const SECOND_SITE = "https://second.invalid"

const TOOK_AT = "2026-09-11T00:00:00.000Z"

const PAIRS: readonly Carry[] = [
  { point: FIRST_POINT, to: FIRST_SITE },
  { point: SECOND_POINT, to: SECOND_SITE },
]

const CARRIED: string[][] = []

const SAID: string[] = []

const FAULTED: string[] = []

let checkouts = 0

let unanswered: string | null = null

let refusing: string | null = null

const relay = await import("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts")

const composing = await import(
  "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
)

const checkout = await import(
  "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"
)

mock.module(
  "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts",
  () => ({
    ...checkout,
    checkoutAt: () => {
      checkouts += 1
      return ROOT
    },
  })
)

mock.module(
  "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts",
  () => ({
    ...composing,
    pathOf: (_root: string, point: string) =>
      point === unanswered ? { refused: `${point} reaches no page` } : `${point}${KEPT_AT}`,
  })
)

mock.module("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts", () => ({
  ...relay,
  carryReadingBeside: (root: string, page: string, to: string, secret: string) => {
    if (to === refusing) return Promise.reject(new Error(`${to} answered 500`))
    CARRIED.push([root, page, to, secret])
    return Promise.resolve(relay.readingCarried(TOOK_AT, to))
  },
}))

const carrying = await import(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"
)

const ran = async (carries: readonly Carry[]): Promise<undefined> => {
  CARRIED.length = 0
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
    await carrying.carryEachReading(carries)
  } finally {
    process.stdout.write = saidWas
    process.stderr.write = faultedWas
  }
  return undefined
}

const sitesCarriedTo = (): readonly string[] => CARRIED.map((one) => one[2] ?? "")

test("a pair is carried in the order the pairs were handed in", async () => {
  unanswered = null
  refusing = null
  await ran(PAIRS)
  expect(sitesCarriedTo()).toEqual([FIRST_SITE, SECOND_SITE])
})

test("a carry is handed the checkout, the page the index answered with and the secret", async () => {
  unanswered = null
  refusing = null
  await ran(PAIRS)
  expect(CARRIED[0]).toEqual([ROOT, `${FIRST_POINT}${KEPT_AT}`, FIRST_SITE, SECRET])
})

test("the checkout is asked for once however many pairs are handed in", async () => {
  unanswered = null
  refusing = null
  await ran(PAIRS)
  expect(checkouts).toBe(1)
})

test("a carry that lands is said where the run's output goes", async () => {
  unanswered = null
  refusing = null
  await ran(PAIRS)
  expect(SAID).toEqual([
    `${relay.readingCarried(TOOK_AT, FIRST_SITE)}\n`,
    `${relay.readingCarried(TOOK_AT, SECOND_SITE)}\n`,
  ])
  expect(FAULTED).toEqual([])
})

test("a point the index answers no page for costs its own carry rather than the rest", async () => {
  unanswered = FIRST_POINT
  refusing = null
  await ran(PAIRS)
  expect(sitesCarriedTo()).toEqual([SECOND_SITE])
  expect(FAULTED).toEqual([`${FIRST_POINT} reaches no page\n`])
})

test("a site that refuses a carry costs that carry rather than the rest", async () => {
  unanswered = null
  refusing = FIRST_SITE
  await ran(PAIRS)
  expect(sitesCarriedTo()).toEqual([SECOND_SITE])
  expect(FAULTED).toEqual([`${FIRST_SITE} answered 500\n`])
})

test("the pairs carried are handed in, so no pair means nothing carried and nothing said", async () => {
  unanswered = null
  refusing = null
  await ran([])
  expect(CARRIED).toEqual([])
  expect(SAID).toEqual([])
  expect(FAULTED).toEqual([])
})

test("no secret to carry on throws rather than carrying part of what was handed in", async () => {
  unanswered = null
  refusing = null
  CARRIED.length = 0
  checkouts = 0
  delete process.env[relay.RELAY_SECRET_NAME]
  await expect(carrying.carryEachReading(PAIRS)).rejects.toThrow(relay.RELAY_SECRET_NAME)
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
  unanswered = FIRST_POINT
  refusing = SECOND_SITE
  try {
    await ran(PAIRS)
  } finally {
    process.exit = endingWas
  }
  expect(ended).toEqual([])
  expect(CARRIED).toEqual([])
  expect(FAULTED.length).toBe(2)
})
