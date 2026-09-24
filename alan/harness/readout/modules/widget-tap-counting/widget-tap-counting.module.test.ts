import { expect, test } from "bun:test"
import { countTap } from "akasha/alan/harness/readout/modules/widget-tap-counting/widget-tap-counting.module.code.ts"
import type { IncrementPropertyArgs } from "akasha/page/access/modules/increment-property/increment-property.module.code.ts"

const AT = new Date("2026-09-24T12:00:00.000Z")

function answering(count: number | null, told: IncrementPropertyArgs[] = []) {
  return <T extends Record<string, unknown>>(args: IncrementPropertyArgs<T>) => {
    told.push(args as IncrementPropertyArgs)
    return Promise.resolve(count)
  }
}

test("a tap adds one to the widget's taps and writes when it came in the same step", async () => {
  const told: IncrementPropertyArgs[] = []
  await countTap("alanwalton-surplus", AT, answering(4, told))
  expect(told).toEqual([
    {
      pageTypeSlug: "readout-widget",
      where: [{ key: "slug", eq: "alanwalton-surplus" }],
      key: "taps",
      set: { lastTappedAt: "2026-09-24T12:00:00.000Z" },
    },
  ])
})

test("a tap answers the count the tap left and the moment it came", async () => {
  expect(await countTap("alanwalton-surplus", AT, answering(4))).toEqual({
    taps: 4,
    at: "2026-09-24T12:00:00.000Z",
  })
})

test("a slug no widget page has answers with nothing", async () => {
  expect(await countTap("no-such-widget", AT, answering(null))).toBe(null)
})
