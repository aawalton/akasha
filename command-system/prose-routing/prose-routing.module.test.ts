import { expect, test } from "bun:test"
import {
  expandProseRoutes,
  normalizeRouteValue,
  PROSE_ROUTE_SUFFIX,
  planProseRouteReads,
} from "./prose-routing.module.code.ts"

test("a flag carrying prose gains a route named for it, and one taking no value gains none", () => {
  const { flags, synthesized } = expandProseRoutes([
    { name: "--body", argLabel: "<text>", valueShape: "prose" },
    { name: "--quiet" },
  ])
  expect(flags.map((one) => one.name)).toEqual(["--body", "--quiet", `--body${PROSE_ROUTE_SUFFIX}`])
  expect(synthesized.get("--body-file")).toEqual({ proseFlag: "--body", valueShape: "prose" })
})

test("a route flag whose name is already taken is not synthesized a second time", () => {
  const { flags } = expandProseRoutes([
    { name: "--body", argLabel: "<text>", valueShape: "prose" },
    { name: "--body-file", argLabel: "<path>", valueShape: "token" },
  ])
  expect(flags.filter((one) => one.name === "--body-file")).toHaveLength(1)
})

test("a hand-declared route beside a line-shaped flag is refused", () => {
  expect(() =>
    expandProseRoutes([
      { name: "--title", argLabel: "<text>", valueShape: "line" },
      { name: "--title-file", argLabel: "<path>", valueShape: "token" },
    ])
  ).toThrow("bypassing the single-line parse")
})

test("a route on a flag that repeats repeats too", () => {
  const { flags } = expandProseRoutes([
    { name: "--note", argLabel: "<text>", valueShape: "prose", repeat: true },
  ])
  expect(flags.find((one) => one.name === "--note-file")?.repeat).toBe(true)
})

test("a value routed as a line loses the terminators at its end, and prose keeps them", () => {
  expect(normalizeRouteValue("one\r\n\n", "line")).toBe("one")
  expect(normalizeRouteValue("one\n\n", "prose")).toBe("one\n\n")
})

test("saying both a flag and its route says one thing twice, and is refused", () => {
  const { synthesized } = expandProseRoutes([
    { name: "--body", argLabel: "<text>", valueShape: "prose" },
  ])
  const both = new Map<string, string | readonly string[] | true>([
    ["--body", "said"],
    ["--body-file", "/var/tmp/said"],
  ])
  expect(() => planProseRouteReads(synthesized, both)).toThrow("cannot be set both as")
})

test("a route said once is planned, and a route left unsaid is not", () => {
  const { synthesized } = expandProseRoutes([
    { name: "--body", argLabel: "<text>", valueShape: "prose" },
  ])
  expect(planProseRouteReads(synthesized, new Map([["--body-file", "/var/tmp/one"]]))).toEqual([
    { routeFlag: "--body-file", proseFlag: "--body", valueShape: "prose", paths: ["/var/tmp/one"] },
  ])
  expect(planProseRouteReads(synthesized, new Map())).toEqual([])
})
