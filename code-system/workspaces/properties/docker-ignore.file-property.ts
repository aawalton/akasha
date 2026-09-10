import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type DockerIgnore = "dockerignore"

export const dockerIgnore = {
  id: "01a06cd1-f990-7f38-95fd-d574435778e7",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "docker-ignore",
  propertySlug: "docker-ignore",
  definition: "the paths a container build leaves out",
  fileName: ".dockerignore",
} as const satisfies FileProperty
