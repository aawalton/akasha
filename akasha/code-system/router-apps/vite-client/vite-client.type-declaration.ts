import type { TypeDeclaration } from "../../type-declarations/type-declaration.page-type.ts"

export const viteClient = {
  id: "01a0691f-7e97-7738-b113-fb70b4cf4446",
  pageTypeSlug: "type-declaration",
  slug: "vite-client",
  definition: "what the bundler hands a router app's modules beyond the language",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An asset import and the bundler's environment are declared by the bundler itself.",
    },
    {
      invariantKind: "departure",
      statement: "Every router app compiles against the same bundler declarations.",
    },
  ],
} as const satisfies TypeDeclaration
