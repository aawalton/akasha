import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const change = {
  id: "01a08173-9ce6-7b9e-9368-d7b307f3c674",
  type: "domain",
  slug: "change",
  definition: "how a change to the repository is worked out and reached by name",
  parts: ["page-type/change", "page-type/thrown"],
  directives: [
    {
      directiveKind: "rule",
      name: "Correctness In The Writer",
      act: "Build into a mechanical writer every truth a check would have caught.",
      warrant:
        "A mechanical change runs no check, so a wrong value it writes lands silently and stays.",
      aids: [
        "Reaching the change system is not being judged.",
        "A check that exists refuses nothing a mechanical change writes.",
      ],
    },
  ],
} as const satisfies Domain
