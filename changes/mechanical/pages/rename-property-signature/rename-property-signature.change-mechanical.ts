import type { ChangeMechanical } from "../../change-mechanical.page-type.ts"

export const renamePropertySignature = {
  id: "01a07718-c9b6-74eb-b71b-e0d52b81f5b7",
  pageTypeSlug: "change-mechanical",
  slug: "rename-property-signature",
  definition: "one property a type declares spelled anew wherever the checker resolves to it",
  code: "ts",
  test: "ts",
  isCommand: false,
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeMechanical
