import type { ChangeGuard } from "../../change-guard.page-type.types.ts"

export const importReachesAFile = {
  id: "01a07969-9122-7db9-ad3c-de58ab103a06",
  pageTypeSlug: "change-guard",
  type: "change-guard",
  slug: "import-reaches-a-file",
  changeTargetType: "change-target-type/file-content",
  definition: "the guard refusing an answer whose written code names an import reaching no file",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The imports judged are read from the body the answer writes.",
    },
    {
      invariantKind: "departure",
      statement: "A path the answer writes a body at has a body.",
    },
    {
      invariantKind: "departure",
      statement: "A path the answer moves away from has no body.",
    },
    {
      invariantKind: "departure",
      statement: "A path no edit names has the body the world before the change holds.",
    },
    {
      invariantKind: "departure",
      statement: "An import reaching no file refuses the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier naming a package is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A body under no TypeScript name is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A landing carrying no extension is looked for under `.ts`, `.tsx` and `.d.ts`.",
    },
    {
      invariantKind: "departure",
      statement: "A landing with no body is looked for again under the roots `rootDirs` names.",
    },
    {
      invariantKind: "departure",
      statement:
        "Those roots are read from the nearest `tsconfig.json` at or above the importing file.",
    },
    {
      invariantKind: "departure",
      statement: "A root is resolved against the folder its `tsconfig.json` is in.",
    },
    {
      invariantKind: "departure",
      statement: "The longest root the landing is under is the root taken off the landing.",
    },
    {
      invariantKind: "departure",
      statement: "What is left of the landing is looked for under each of the other roots.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier a root resolves carries no extension, and the file it names carries one.",
    },
    {
      invariantKind: "departure",
      statement: "Re-rooting a landing and probing its extension are one reach rather than two.",
    },
    {
      invariantKind: "departure",
      statement: "`require-import-extension` judges a landing under the importing file's own root.",
    },
    {
      invariantKind: "departure",
      statement: "The probing here carries a landing under one of the other roots.",
    },
    {
      invariantKind: "departure",
      statement: "A `tsconfig.json` that will not parse names no root.",
    },
    {
      invariantKind: "absence",
      statement: "No `tsconfig.json` an `extends` names is read here.",
    },
    {
      invariantKind: "absence",
      statement: "Neither `paths` nor `baseUrl` is read here.",
    },
    {
      invariantKind: "gap",
      statement: "A specifier `paths` or `baseUrl` resolves is judged.",
    },
    {
      invariantKind: "gap",
      statement: "A root inherited through `extends` is read.",
    },
  ],
} as const satisfies ChangeGuard
