import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const serviceAsking = {
  id: "01a09424-ecd8-7c1f-b068-99932a16c139",
  type: "module",
  slug: "service-asking",
  definition: "a systemctl call made so that what it throws is answered rather than thrown on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call that throws is answered as a code no run of systemctl gives.",
    },
    {
      invariantKind: "departure",
      statement: "What was thrown is carried back as the words the answer holds.",
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
      statement: "Nothing here throws out of the landing.",
    },
  ],
} as const satisfies Module
