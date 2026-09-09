import type { FileProperty } from "../file-properties/file-property.page-type.ts"
import type { PageType } from "../types/page-type.page-type.ts"
import type { MaxCpuSeconds } from "./properties/max-cpu-seconds.number-property.ts"
import type { MaxMemoryMb } from "./properties/max-memory-mb.number-property.ts"
import type { MaxWallSeconds } from "./properties/max-wall-seconds.number-property.ts"

export type CodeFileProperty = FileProperty & {
  maxCpuSeconds?: MaxCpuSeconds
  maxWallSeconds?: MaxWallSeconds
  maxMemoryMb?: MaxMemoryMb
}

export const codeFileProperty = {
  id: "01a0877d-0474-7e0b-9ce4-b84e15eed4ed",
  pageTypeSlug: "page-type",
  slug: "code-file-property",
  definition: "a page property held in a file something runs",
  pluralSlug: "code-file-properties",
  parts: [
    "number-property/max-cpu-seconds",
    "number-property/max-memory-mb",
    "number-property/max-wall-seconds",
  ],
  extends: ["page-type/file-property"],
  properties: [
    { pagePropertySlug: "number-property/max-cpu-seconds", required: false, many: false },
    { pagePropertySlug: "number-property/max-wall-seconds", required: false, many: false },
    { pagePropertySlug: "number-property/max-memory-mb", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property stating no ceiling holds no run.",
    },
    {
      invariantKind: "gap",
      statement:
        "A run of a code file property's file is stopped at the ceilings that property states.",
    },
  ],
} as const satisfies PageType
