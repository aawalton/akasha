import type { PageProperty } from "../types/page-properties/page-property.page-type.ts"
import type { FolderName } from "./properties/folder-name.text-property.ts"

export type NamedFolderProperty = PageProperty & {
  folderName: FolderName
}
