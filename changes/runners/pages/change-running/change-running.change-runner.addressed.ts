export type Changes = {
  "change-authored/add-file": Parameters<
    typeof import("../../../agent/file/add-file/add-file.change-authored.code.ts")["runChange"]
  >[1]
  "change-authored/change-file": Parameters<
    typeof import("../../../agent/file-content/change-file/change-file.change-authored.code.ts")["runChange"]
  >[1]
  "change-checked/add-property-value": Parameters<
    typeof import("../../../agent/file-content/add-property-value/add-property-value.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/change-domain-parent": Parameters<
    typeof import("../../../agent/file-content/change-domain-parent/change-domain-parent.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/change-page-page-type": Parameters<
    typeof import("../../../agent/file/change-page-page-type/change-page-page-type.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/change-page-property": Parameters<
    typeof import("../../../agent/file-content/change-page-property/change-page-property.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/move-folder": Parameters<
    typeof import("../../../agent/folder/move-folder/move-folder.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/move-folder-package": Parameters<
    typeof import("../../../agent/folder/move-folder-package/move-folder-package.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/move-page": Parameters<
    typeof import("../../../agent/file/move-page/move-page.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/remove-file": Parameters<
    typeof import("../../../agent/file/remove-file/remove-file.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/remove-package-alias": Parameters<
    typeof import("../../../agent/file-content/remove-package-alias/remove-package-alias.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/remove-page": Parameters<
    typeof import("../../../agent/file/remove-page/remove-page.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/remove-page-type": Parameters<
    typeof import("../../../agent/folder/remove-page-type/remove-page-type.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/remove-property-value": Parameters<
    typeof import("../../../agent/file-content/remove-property-value/remove-property-value.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/rename-code-token": Parameters<
    typeof import("../../../agent/file-content/rename-code-token/rename-code-token.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/rename-package": Parameters<
    typeof import("../../../agent/file-content/rename-package/rename-package.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/rename-page": Parameters<
    typeof import("../../../agent/file/rename-page/rename-page.change-checked.code.ts")["runChange"]
  >[1]
  "change-mechanical-code/rename-local-variable": Parameters<
    typeof import("../../../mechanical/file-content/rename/rename-local-variable/rename-local-variable.change-mechanical-code.code.ts")["runChange"]
  >[1]
  "change-mechanical-code/rename-property-signature": Parameters<
    typeof import("../../../mechanical/file-content/rename/rename-property-signature/rename-property-signature.change-mechanical-code.code.ts")["runChange"]
  >[1]
  "change-mechanical-data/add-property-value": Parameters<
    typeof import("../../../mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-data.code.ts")["runChange"]
  >[1]
  "change-mechanical-data/change-page-property-relation": Parameters<
    typeof import("../../../mechanical/file-content/change/change-page-property-relation/change-page-property-relation.change-mechanical-data.code.ts")["runChange"]
  >[1]
  "change-mechanical-data/remove-property-value": Parameters<
    typeof import("../../../mechanical/file-content/remove/remove-property-value/remove-property-value.change-mechanical-data.code.ts")["runChange"]
  >[1]
  "change-mechanical-data/rename-page-address": Parameters<
    typeof import("../../../mechanical/file-content/rename/rename-page-address/rename-page-address.change-mechanical-data.code.ts")["runChange"]
  >[1]
  "change-mechanical-data/rename-page-slug": Parameters<
    typeof import("../../../mechanical/file-content/rename/rename-page-slug/rename-page-slug.change-mechanical-data.code.ts")["runChange"]
  >[1]
  "change-mechanical-file-content/change-file-content": Parameters<
    typeof import("../../../mechanical/file-content/change/change-file-content/change-file-content.change-mechanical-file-content.code.ts")["runChange"]
  >[1]
  "change-mechanical-file-content/change-file-content-code": Parameters<
    typeof import("../../../mechanical/file-content/change/change-file-content-code/change-file-content-code.change-mechanical-file-content.code.ts")["runChange"]
  >[1]
  "change-mechanical-file-content/change-imports": Parameters<
    typeof import("../../../mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts")["runChange"]
  >[1]
  "change-mechanical-file-content/change-page-property": Parameters<
    typeof import("../../../mechanical/file-content/change/change-page-property/change-page-property.change-mechanical-file-content.code.ts")["runChange"]
  >[1]
  "change-mechanical-file-content/rename-export": Parameters<
    typeof import("../../../mechanical/file-content/rename/rename-export/rename-export.change-mechanical-file-content.code.ts")["runChange"]
  >[1]
  "change-mechanical-file/add-file": Parameters<
    typeof import("../../../mechanical/file/add/add-file/add-file.change-mechanical-file.code.ts")["runChange"]
  >[1]
  "change-mechanical-file/add-file-code": Parameters<
    typeof import("../../../mechanical/file/add/add-file-code/add-file-code.change-mechanical-file.code.ts")["runChange"]
  >[1]
  "change-mechanical-file/add-file-page": Parameters<
    typeof import("../../../mechanical/file/add/add-file-page/add-file-page.change-mechanical-file.code.ts")["runChange"]
  >[1]
  "change-mechanical-file/add-file-page-property": Parameters<
    typeof import("../../../mechanical/file/add/add-file-page-property/add-file-page-property.change-mechanical-file.code.ts")["runChange"]
  >[1]
  "change-mechanical-file/add-file-page-type": Parameters<
    typeof import("../../../mechanical/file/add/add-file-page-type/add-file-page-type.change-mechanical-file.code.ts")["runChange"]
  >[1]
  "change-mechanical-file/move-file": Parameters<
    typeof import("../../../mechanical/file/move/move-file/move-file.change-mechanical-file.code.ts")["runChange"]
  >[1]
  "change-mechanical-file/remove-file": Parameters<
    typeof import("../../../mechanical/file/remove/remove-file/remove-file.change-mechanical-file.code.ts")["runChange"]
  >[1]
  "change-mechanical-file/remove-file-code": Parameters<
    typeof import("../../../mechanical/file/remove/remove-file-code/remove-file-code.change-mechanical-file.code.ts")["runChange"]
  >[1]
  "change-mechanical-file/remove-file-page": Parameters<
    typeof import("../../../mechanical/file/remove/remove-file-page/remove-file-page.change-mechanical-file.code.ts")["runChange"]
  >[1]
  "change-mechanical-file/rename-path": Parameters<
    typeof import("../../../mechanical/file/rename/rename-path/rename-path.change-mechanical-file.code.ts")["runChange"]
  >[1]
  "change-mechanical-folder/remove-page-type": Parameters<
    typeof import("../../../mechanical/folder/remove/remove-page-type/remove-page-type.change-mechanical-folder.code.ts")["runChange"]
  >[1]
  "change-mechanical-manifest/change-manifest-ways": Parameters<
    typeof import("../../../mechanical/file-content/change/change-manifest-ways/change-manifest-ways.change-mechanical-manifest.code.ts")["runChange"]
  >[1]
  "change-mechanical-manifest/remove-manifest-ways": Parameters<
    typeof import("../../../mechanical/file-content/remove/remove-manifest-ways/remove-manifest-ways.change-mechanical-manifest.code.ts")["runChange"]
  >[1]
  "change-restated/change-page-property-text": Parameters<
    typeof import("../../../agent/file-content/change-page-property-text/change-page-property-text.change-restated.code.ts")["runChange"]
  >[1]
}
