import { EU_LIBRARY_DATA_PART_1 } from "../housing-library-data-eu-1/housing-library-data-eu-1.module.code.ts"
import { EU_LIBRARY_DATA_PART_2 } from "../housing-library-data-eu-2/housing-library-data-eu-2.module.code.ts"
import { EU_LIBRARY_DATA_PART_3 } from "../housing-library-data-eu-3/housing-library-data-eu-3.module.code.ts"
import { EU_LIBRARY_DATA_PART_4 } from "../housing-library-data-eu-4/housing-library-data-eu-4.module.code.ts"
import { EU_LIBRARY_DATA_PART_5 } from "../housing-library-data-eu-5/housing-library-data-eu-5.module.code.ts"
import { EU_LIBRARY_DATA_PART_6 } from "../housing-library-data-eu-6/housing-library-data-eu-6.module.code.ts"
import type { LibraryEntry } from "../housing-types/housing-types.module.code.ts"

export const EU_LIBRARY_DATA: LibraryEntry[] = [
  ...EU_LIBRARY_DATA_PART_1,
  ...EU_LIBRARY_DATA_PART_2,
  ...EU_LIBRARY_DATA_PART_3,
  ...EU_LIBRARY_DATA_PART_4,
  ...EU_LIBRARY_DATA_PART_5,
  ...EU_LIBRARY_DATA_PART_6,
]
