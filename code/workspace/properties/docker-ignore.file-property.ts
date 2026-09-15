import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const dockerIgnore = {
  id: "01a06cd1-f990-7f38-95fd-d574435778e7",
  type: "page-type/file-property",
  slug: "docker-ignore",
  propertySlug: "docker-ignore",
  definition: "the paths a container build leaves out",
  extensions: ["dockerignore"],
  fileName: ".dockerignore",
  types: "ts",
} as const satisfies FileProperty
