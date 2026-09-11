import type { FolderName } from "akasha/pages/named-folder-properties/properties/folder-name.text-property.ts"
import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"

export type NamedFolderProperty = PageProperty & {
  folderName: FolderName
}
