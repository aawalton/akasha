import { afterAll, expect, test } from "bun:test"
import {
  bytesAs,
  costOf,
  costsIn,
  heldIn,
  latestOf,
  linesOf,
  meanOf,
  midOf,
  mostOf,
  rankedOf,
  secondsAs,
  totalOf,
  windowOf,
  withinOf,
} from "akasha/check/modules/measuring/check-measuring.module.code.ts"
import {
  AUDIT_LOGS,
  agoOf,
  costsOf,
  DAY,
  DAY_BACK,
  DRAWN_TOTAL,
  ENTRIES,
  HOUR,
  JUDGED_TOTAL,
  LAST_RUN,
  NO_TOTAL,
  NOW,
  ONE,
  partAt,
  rootAged,
  rootChosen,
  rootDeployed,
  rootGrouped,
  rootJudged,
  rootLimited,
  rootLoose,
  rootOrdered,
  rootStale,
  rootThrice,
  rootUnrun,
  rootWith,
  rowsBeside,
  rowsInto,
  runsOf,
  scratch,
  spacedOnce,
  THREE,
  TORN_SAID,
  TWO,
  tornInto,
  unreadableInto,
  ZERO_TOTAL,
} from "akasha/check/modules/measuring/check-measuring.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("an average is what the runs took together shared out over how many there were", () => {
  expect(meanOf([1, 2, 9])).toBe(4)
  expect(meanOf([1, 2, 3, 10])).toBe(4)
  expect(meanOf([])).toBe(null)
})

test("a middle is the run in the middle, or halfway between the two runs there", () => {
  expect(midOf([9, 1, 2])).toBe(2)
  expect(midOf([10, 1, 3, 2])).toBe(2.5)
  expect(midOf([])).toBe(null)
})

test("runs holding an outlier are said by a middle that outlier does not drag", () => {
  const cost = costOf(
    "one",
    runsOf([
      { phase: "change", cpuSeconds: 4, peakAddedBytes: 512 },
      { phase: "change", cpuSeconds: 4, peakAddedBytes: 512 },
      { phase: "change", cpuSeconds: 4, peakAddedBytes: 512 },
      { phase: "change", cpuSeconds: 1, peakAddedBytes: 64 },
      { phase: "change", cpuSeconds: 1, peakAddedBytes: 64 },
    ])
  )

  expect([cost.cpu, cost.cpuMid]).toEqual([2.8, 4])
  expect([cost.mem, cost.memMid]).toEqual([332.8, 512])
})

test("a run's processor time is its own together with the children it reaped", () => {
  const runs = runsOf([{ phase: "change", cpuSeconds: 1.5, childCpuSeconds: 2.25 }])

  expect(runs[0]?.cpu).toBe(3.75)
})

test("a record naming no run id is read as belonging to no run", () => {
  const runs = runsOf([
    { phase: "change", runId: null },
    { phase: "change", runId: "" },
  ])

  expect(runs.map((one) => one.runId)).toEqual([null, null])
})

test("a run that forgot no high-water mark is left out of memory but counted everywhere else", () => {
  const cost = costOf(
    "one",
    runsOf([
      { phase: "change", cpuSeconds: 9, peakAddedBytes: 999, peakMeasured: false },
      { phase: "change", cpuSeconds: 2, peakAddedBytes: 100 },
      { phase: "change", cpuSeconds: 1, peakAddedBytes: 200 },
      { phase: "change", cpuSeconds: 4, peakAddedBytes: 900 },
    ])
  )

  expect(cost.cpu).toBe(4)
  expect(cost.mem).toBe(400)
  expect(cost.runs).toBe(4)
})

test("a run exactly the period's age is counted and a run a moment older is not", () => {
  const runs = runsOf([
    { phase: "change", cpuSeconds: 6, ranAt: agoOf(DAY) },
    { phase: "change", cpuSeconds: 60, ranAt: agoOf(DAY + 1) },
  ])

  expect(withinOf(runs, NOW, DAY).map((one) => one.cpu)).toEqual([6])
})

test("a run stamped after the moment of asking is not counted", () => {
  const runs = runsOf([{ phase: "change", cpuSeconds: 7, ranAt: agoOf(-HOUR) }])

  expect(withinOf(runs, NOW, DAY)).toEqual([])
})

test("a run whose time cannot be read is not counted", () => {
  const runs = runsOf([{ phase: "change", cpuSeconds: 7, ranAt: "the other day" }])

  expect(withinOf(runs, NOW, DAY)).toEqual([])
})

test("a run older than the period counts towards no average, at the edge or far outside", () => {
  const cost = costsIn(rootAged(), NOW, DAY_BACK).checks[0]

  expect(cost?.runs).toBe(2)
  expect(cost?.cpu).toBe(3)
})

test("a check holding no run the choice reached is not answered", () => {
  expect(costsIn(rootStale(), NOW, DAY_BACK).checks.map((one) => one.check)).toEqual(["fresh"])
})

test("a call handing over no argument reads the past twenty-four hours", () => {
  expect(windowOf(undefined)).toEqual({ chosen: DAY_BACK, refusals: [] })
})

test("a count names how many of the newest runs are read", () => {
  expect(windowOf("5").chosen).toEqual({ by: "runs", runs: 5 })
})

test("a period is named in minutes or hours or days", () => {
  expect(windowOf("30m").chosen).toEqual({ by: "period", ms: 1800000, said: "30m" })
  expect(windowOf("2h").chosen).toEqual({ by: "period", ms: 7200000, said: "2h" })
  expect(windowOf("7d").chosen).toEqual({ by: "period", ms: 604800000, said: "7d" })
})

test("a count of no runs is refused", () => {
  const chose = windowOf("0")

  expect(chose.chosen).toBe(null)
  expect(chose.refusals[0]).toContain("`--last <count>`")
})

test("a word this module reads as neither a count nor a period is refused", () => {
  expect(windowOf("yesterday").chosen).toBe(null)
  expect(windowOf("3w").chosen).toBe(null)
  expect(windowOf("0h").chosen).toBe(null)
})

test("runs are ranked by the latest moment any record of that run carries", () => {
  const runs = runsOf([
    { phase: "change", runId: ONE, ranAt: agoOf(3 * HOUR) },
    { phase: "change", runId: ONE, ranAt: agoOf(HOUR) },
    { phase: "change", runId: TWO, ranAt: agoOf(2 * HOUR) },
    { phase: "change", runId: THREE, ranAt: agoOf(4 * HOUR) },
  ])

  expect([...rankedOf(latestOf(runs), 2)]).toEqual([ONE, TWO])
})

test("a record carrying no run id is counted nowhere where runs were counted", () => {
  const costs = costsIn(rootLoose(), NOW, LAST_RUN)

  expect(costs.checks[0]?.runs).toBe(1)
  expect(costs.checks[0]?.cpu).toBe(2)
})

test("a record carrying no run id is counted where a period was named", () => {
  const costs = costsIn(rootUnrun(), NOW, DAY_BACK)

  expect(costs.checks[0]?.runs).toBe(2)
  expect(costs.checks[0]?.cpu).toBe(3)
})

test("only the runs chosen are counted where a count was named", () => {
  const root = rootChosen()

  expect(costsIn(root, NOW, LAST_RUN).checks[0]?.cpu).toBe(2)
  expect(costsIn(root, NOW, { by: "runs", runs: 2 }).checks[0]?.runs).toBe(2)
  expect(costsIn(root, NOW, { by: "runs", runs: 9 }).checks[0]?.runs).toBe(3)
})

test("one run's runs are the runs of every check that run judged", () => {
  const costs = costsIn(rootJudged(), NOW, LAST_RUN)

  expect(costs.checks.map((one) => one.check)).toEqual(["two", "one"])
  expect(costs.total).toEqual(JUDGED_TOTAL)
})

test("the total shares the processor and the elapsed time over the distinct runs read", () => {
  const total = totalOf(
    runsOf([
      { phase: "change", runId: ONE, cpuSeconds: 3, wallMs: 3000 },
      { phase: "change", runId: ONE, cpuSeconds: 5, wallMs: 5000 },
      { phase: "change", runId: TWO, cpuSeconds: 2, wallMs: 2000 },
    ])
  )

  expect([total.runs, total.cpu, total.wall]).toEqual([2, 5, 5])
})

test("the most the total says of a time is what one whole run took", () => {
  const total = totalOf(
    runsOf([
      { phase: "change", runId: ONE, cpuSeconds: 3, wallMs: 1000, peakAddedBytes: 2048 },
      { phase: "change", runId: ONE, cpuSeconds: 4, wallMs: 2000, peakAddedBytes: 512 },
      { phase: "change", runId: TWO, cpuSeconds: 5, wallMs: 2500, peakAddedBytes: 99 },
    ])
  )

  expect([total.cpuMost, total.wallMost, total.memMost]).toEqual([7, 3, 2048])
  expect([total.cpuMid, total.wallMid]).toEqual([6, 2.75])
})

test("no run at all totals no processor time rather than a time of zero", () => {
  expect(totalOf(runsOf([{ phase: "change", runId: ONE }]))).toEqual(ZERO_TOTAL)
  expect(totalOf([])).toEqual(NO_TOTAL)
})

test("the total sits beneath the table with its average memory drawn absent", () => {
  const cost = costOf("one", runsOf([{ phase: "change", cpuSeconds: 2 }]))
  const said = linesOf({ checks: [cost], total: DRAWN_TOTAL, unread: [], torn: [] })

  expect(spacedOnce(said[2])).toBe("")
  expect(spacedOnce(said[3])).toBe("total 1 2.000s 4.000s - 6.000s 7.000s - 3.000s 5.000s 2.0 KiB")
})

test("how many runs a check holds is counted beside its averages", () => {
  const cost = costsIn(rootThrice(), NOW, DAY_BACK).checks[0]

  expect(cost?.runs).toBe(3)
  expect(cost?.cpu).toBe(4)
})

test("the check group counts a deploy run beside a change run", () => {
  const cost = costsIn(rootDeployed(), NOW, DAY_BACK).checks[0]

  expect(cost?.runs).toBe(2)
  expect(cost?.cpu).toBe(4.5)
})

test("a check no run was judged at carries no average rather than an average of zero", () => {
  const cost = costOf("one", [])

  expect(cost.runs).toBe(0)
  expect(cost.cpu).toBe(null)
  expect(cost.mem).toBe(null)
  expect(mostOf([])).toBe(null)
  const said = linesOf(costsOf([cost]))[1] ?? ""

  expect(spacedOnce(said)).toBe("one 0 - - - - - - - - -")
})

test("the table carries one set of columns for the group read", () => {
  const cost = costOf("one", runsOf([{ phase: "change", cpuSeconds: 0 }]))
  const said = linesOf(costsOf([cost]))

  expect(spacedOnce(said[0])).toBe(
    "check runs cpu avg wall avg mem avg cpu mid wall mid mem mid cpu max wall max mem max cpu lim wall lim mem lim"
  )
  expect(spacedOnce(said[1])).toBe("one 1 0.000s 0.000s 0 B 0.000s 0.000s 0 B 0.000s 0.000s 0 B")
})

test("a check's ceilings are drawn beside what its runs took, and nothing where it states none", () => {
  const said = linesOf(costsIn(rootLimited(), NOW, DAY_BACK))

  expect(spacedOnce(said[1])).toBe(
    "one 1 2.000s 0.000s 0 B 2.000s 0.000s 0 B 2.000s 0.000s 0 B 10.000s 20.000s 512.0 MiB"
  )
  expect(spacedOnce(said[2])).toBe("two 1 1.000s 0.000s 0 B 1.000s 0.000s 0 B 1.000s 0.000s 0 B")
})

test("the group read says which of a check's ceilings are drawn", () => {
  const root = rootGrouped()

  expect(costsIn(root, NOW, DAY_BACK).checks[0]?.limits.cpu).toBe(10)
  expect(costsIn(root, NOW, DAY_BACK, "audit").checks[0]?.limits.cpu).toBe(15)
})

test("every measure is said as an average and as the most any one run took", () => {
  const cost = costOf(
    "one",
    runsOf([
      { phase: "change", cpuSeconds: 1, wallMs: 2000, peakAddedBytes: 100 },
      { phase: "change", cpuSeconds: 3, wallMs: 4000, peakAddedBytes: 700 },
    ])
  )

  expect([cost.cpu, cost.cpuMost]).toEqual([2, 3])
  expect([cost.wall, cost.wallMost]).toEqual([3, 4])
  expect([cost.mem, cost.memMost]).toEqual([400, 700])
})

test("a run's elapsed time is read from the milliseconds its row states", () => {
  expect(runsOf([{ phase: "change", wallMs: 1500 }])[0]?.wall).toBe(1.5)
})

test("checks are ordered by what their runs took, and equal times by name", () => {
  const root = rootOrdered()

  expect(costsIn(root, NOW, DAY_BACK).checks.map((one) => one.check)).toEqual([
    "slow",
    "skewed",
    "b-tie",
    "fast",
  ])
})

test("the check logs are read by default and the audit logs where audit was named", () => {
  const root = rootWith({ one: [{ phase: "change", cpuSeconds: 2, peakAddedBytes: 2048 }] })
  rowsBeside(
    root,
    { one: [{ phase: "audit", cpuSeconds: 8, peakAddedBytes: 1048576 }] },
    AUDIT_LOGS
  )
  const check = costsIn(root, NOW, DAY_BACK).checks[0]
  const audit = costsIn(root, NOW, DAY_BACK, "audit").checks[0]

  expect(check?.runs).toBe(1)
  expect(check?.cpu).toBe(2)
  expect(check?.mem).toBe(2048)
  expect(audit?.runs).toBe(1)
  expect(audit?.cpu).toBe(8)
  expect(audit?.mem).toBe(1048576)
})

test("a check holding no run of the group read is not answered", () => {
  const root = rootWith({ one: [{ phase: "change", cpuSeconds: 2 }], two: [] })
  rowsBeside(root, { two: [{ phase: "audit", cpuSeconds: 8 }] }, AUDIT_LOGS)

  expect(costsIn(root, NOW, DAY_BACK).checks.map((one) => one.check)).toEqual(["one"])
  expect(costsIn(root, NOW, DAY_BACK, "audit").checks.map((one) => one.check)).toEqual(["two"])
})

test("a log row belongs to the group its file names whatever phase that row spells", () => {
  const root = rootWith({ one: [{ phase: "audit", cpuSeconds: 2 }] })

  expect(costsIn(root, NOW, DAY_BACK).checks[0]?.cpu).toBe(2)
  expect(costsIn(root, NOW, DAY_BACK, "audit").checks).toEqual([])
})

test("an entries row is placed by the phase it spells, the best that old data admits", () => {
  const root = rootWith({ one: [{ phase: "change", cpuSeconds: 2 }] })
  const rows = [
    { phase: "patch", cpuSeconds: 4 },
    { phase: "audit", cpuSeconds: 100 },
  ]
  rowsBeside(root, { one: rows }, ENTRIES)

  expect(costsIn(root, NOW, DAY_BACK).checks[0]?.cpu).toBe(3)
  expect(costsIn(root, NOW, DAY_BACK, "audit").checks[0]?.cpu).toBe(100)
})

test("a row the logs already hold is not counted again from the entries", () => {
  const copied = { phase: "change", cpuSeconds: 2, runId: ONE }
  const root = rootWith({ one: [copied] })
  rowsBeside(root, { one: [copied, { phase: "change", cpuSeconds: 6, runId: TWO }] }, ENTRIES)

  expect(costsIn(root, NOW, DAY_BACK).checks[0]?.runs).toBe(2)
})

test("every numbered file of a check's logs is read in order rather than the first alone", () => {
  const root = rootWith({ one: [{ phase: "change", cpuSeconds: 2, runId: ONE }] })
  rowsInto(root, { one: [{ phase: "change", cpuSeconds: 4, runId: TWO }] }, 2)
  rowsInto(root, { one: [{ phase: "change", cpuSeconds: 6, runId: THREE }] }, 3)
  const cost = costsIn(root, NOW, DAY_BACK).checks[0]

  expect(heldIn(root).held[0]?.runs.map((one) => one.cpu)).toEqual([2, 4, 6])
  expect(cost?.runs).toBe(3)
  expect(cost?.cpu).toBe(4)
})

test("a file that could not be read is named beneath the table", () => {
  const root = unreadableInto(rootWith({ one: [{ phase: "change", cpuSeconds: 1 }] }), "bad")
  const costs = costsIn(root, NOW, DAY_BACK)

  expect(costs.checks.map((one) => one.check)).toEqual(["one"])
  expect(costs.unread).toEqual([partAt("bad", 1)])
  expect(costs.torn).toEqual([])
})

test("a row that would not read is passed over and the rest of that file is read", () => {
  const root = tornInto(rootWith({ one: [{ phase: "change", cpuSeconds: 1 }] }), "bad")
  const costs = costsIn(root, NOW, DAY_BACK)

  expect(costs.checks.find((one) => one.check === "bad")?.runs).toBe(1)
  expect(costs.unread).toEqual([])
  expect(costs.torn).toEqual([partAt("bad", 1)])
  expect(linesOf(costs).slice(-2)).toEqual([TORN_SAID, partAt("bad", 1)])
})

test("memory is scaled to the unit that fits and processor time runs to three decimals", () => {
  expect(bytesAs(0)).toBe("0 B")
  expect(bytesAs(8192)).toBe("8.0 KiB")
  expect(bytesAs(29546496)).toBe("28.2 MiB")
  expect(bytesAs(4559089664)).toBe("4.2 GiB")
  expect(secondsAs(3.939)).toBe("3.939s")
})

test("a count of bytes is rounded to the whole byte before it is scaled", () => {
  expect(bytesAs(512.4)).toBe("512 B")
  expect(bytesAs(1023.6)).toBe("1.0 KiB")
})

test("a root holding no checks answers no check rather than throwing", () => {
  const root = rowsInto(scratch.rootFor("check-measuring-empty-"), {})

  expect(costsIn(root, NOW, LAST_RUN)).toEqual({
    checks: [],
    total: NO_TOTAL,
    unread: [],
    torn: [],
  })
})
