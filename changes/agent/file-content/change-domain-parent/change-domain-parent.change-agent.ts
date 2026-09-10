import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const changeDomainParent = {
  id: "01a0795e-9c4f-7299-9238-117baca6b57e",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "change-domain-parent",
  changeMode: "change-mode-change",
  definition: "one page made a part of another page rather than of the page naming it now",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reparenting is left to the mechanical change of that name.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
