import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type DockerIgnore = "dockerignore"

export const dockerIgnore = {
  id: "01a06cd1-f990-7f38-95fd-d574435778e7",
  pageTypeSlug: "named-file-property",
  slug: "docker-ignore",
  propertySlug: "docker-ignore",
  definition: "the paths a container build leaves out",
  fileName: ".dockerignore",
} as const satisfies NamedFileProperty
