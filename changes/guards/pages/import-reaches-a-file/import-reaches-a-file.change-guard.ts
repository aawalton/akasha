import type { ChangeGuard } from "akasha/changes/guards/change-guard.page-type.types.ts"

export const importReachesAFile = {
  id: "01a07969-9122-7db9-ad3c-de58ab103a06",
  type: "change-guard",
  slug: "import-reaches-a-file",
  changeTargetType: "change-target-type/file-content",
  definition: "the guard refusing an answer whose written code names an import reaching no file",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The imports judged are read from the body the answer writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the answer writes a body at has a body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the answer moves away from has no body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path no edit names has the body the world before the change holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import reaching no file refuses the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier naming a package is judged by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body under no TypeScript name is judged by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A landing carrying no extension is looked for under `.ts` and `.tsx` and `.d.ts`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing with no body is looked for again under the roots `rootDirs` names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Those roots are read from the nearest `tsconfig.json` at or above the importing file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A root is resolved against the folder its `tsconfig.json` is in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The longest root the landing is under is the root taken off the landing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rest of the landing is looked for under every other root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier a root resolves carries no extension.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file that specifier names carries an extension.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Re-rooting a landing and probing its extension are one reach rather than two.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`require-import-extension` judges a landing under the importing file's own root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The probing here carries a landing under another root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `tsconfig.json` that will not parse names no root.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No `tsconfig.json` an `extends` names is read here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Neither `paths` nor `baseUrl` is read here.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A specifier `paths` or `baseUrl` resolves is judged.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A root inherited through `extends` is read.",
    },
  ],
} as const satisfies ChangeGuard
