import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const cargoBuildScript = {
  id: "01a0602d-6ad0-7e19-aab3-8b2f83b6fc8c",
  type: "page-type/code-file-property",
  slug: "cargo-build-script",
  propertySlug: "cargo-build-script",
  definition: "what Cargo runs before Cargo compiles a crate",
  extensions: ["rs"],
  fileName: "build.rs",
  types: "ts",
  createdAt: "2026-09-02T03:33:04.336Z",
  updatedAt: "2026-09-15T16:19:31.000Z",
} as const satisfies CodeFileProperty
