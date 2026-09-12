import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const serviceRestarting = {
  id: "01a09424-ecd8-7c1f-b068-99932a16c139",
  type: "module",
  slug: "service-restarting",
  definition: "the start a landing asks of a unit whose own text changed how that unit behaves",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A start asked for is taken at once, nothing here holding one back.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service takes its own start for code that moved, so a landing asks for none of those.",
    },
    {
      invariantKind: "departure",
      statement: "A timer is armed by the same asking, arming ending no work.",
    },
    {
      invariantKind: "departure",
      statement: "A service that is stopped is left stopped, since the start asked for is a try.",
    },
    {
      invariantKind: "departure",
      statement: "A systemctl that refuses is said as wrong rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A start refused names what puts that service right.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a unit, installs one, or tells systemd to read one again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rules on how long a service has been up.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here carries a start from one landing to the next.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws out of the landing.",
    },
  ],
} as const satisfies Module
