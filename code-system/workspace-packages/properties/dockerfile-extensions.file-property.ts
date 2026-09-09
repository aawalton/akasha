import type { FileProperty } from "@akasha/pages/file-property"

export type DockerfileExtensions = "json"

export const dockerfileExtensions = {
  id: "01a08175-8457-787e-b750-1fc765e70df3",
  pageTypeSlug: "file-property",
  slug: "dockerfile-extensions",
  propertySlug: "dockerfile-extensions",
  definition: "what a package adds to the dockerfile built for it",
  fileName: "deploy/dockerfile-extensions.json",
} as const satisfies FileProperty
