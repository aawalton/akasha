import type { CodeFileProperty } from "@akasha/pages/code-file-property"

export type CargoBuildScript = "rs"

export const cargoBuildScript = {
  id: "01a0602d-6ad0-7e19-aab3-8b2f83b6fc8c",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "cargo-build-script",
  propertySlug: "cargo-build-script",
  definition: "what Cargo runs before Cargo compiles a crate",
  fileName: "build.rs",
} as const satisfies CodeFileProperty
