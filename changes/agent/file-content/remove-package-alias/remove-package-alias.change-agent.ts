import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const removePackageAlias = {
  id: "01a07c16-3e5f-7641-95c5-a6e485991ad1",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "remove-package-alias",
  changeMode: "change-mode-remove",
  definition: "the alias a renamed package was reached under taken out of every manifest",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The name the package has now is read from the manifest the caller names.",
    },
    {
      invariantKind: "departure",
      statement: "An old name equal to the name the package has is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body still reaching the package under the old name refuses the whole drop.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the body that still reaches the package.",
    },
    {
      invariantKind: "departure",
      statement: "A string with the old name inside a longer sentence reaches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is dropped only where that entry's value aliases the name now carried.",
    },
    {
      invariantKind: "departure",
      statement: "An entry under the old name whose value is no alias is left where that entry is.",
    },
    {
      invariantKind: "departure",
      statement: "An alias is looked for under each kind of dependency a manifest states.",
    },
    {
      invariantKind: "departure",
      statement: "Every manifest the index names is read for the alias.",
    },
    {
      invariantKind: "departure",
      statement: "A dropped entry takes the comma parting that entry from its neighbour.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest keeps the spacing around the entries left behind.",
    },
    {
      invariantKind: "departure",
      statement: "A drop answering no edit is refused.",
    },
    {
      invariantKind: "gap",
      statement: "The lockfile a dropped alias leaves is settled by the landing rather than here.",
    },
    {
      invariantKind: "absence",
      statement: "No body is repointed here.",
    },
    {
      invariantKind: "absence",
      statement: "No package is renamed here.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
