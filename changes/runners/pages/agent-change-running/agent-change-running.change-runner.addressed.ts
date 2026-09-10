export type Changes = {
  "change-agent/add-file": Parameters<
    typeof import("../../../agent/file/add-file/add-file.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-page-type-types": Parameters<
    typeof import("../../../agent/page-type/add-page-type-types/add-page-type-types.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-property-record": Parameters<
    typeof import("../../../agent/file-content/add-property-record/add-property-record.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-property-to-every-page": Parameters<
    typeof import("../../../agent/page-type/add-property-to-every-page/add-property-to-every-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-property-to-page-type": Parameters<
    typeof import("../../../agent/page-type/add-property-to-page-type/add-property-to-page-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-property-value": Parameters<
    typeof import("../../../agent/file-content/add-property-value/add-property-value.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-property-values": Parameters<
    typeof import("../../../agent/file-content/add-property-values/add-property-values.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-domain-parent": Parameters<
    typeof import("../../../agent/file-content/change-domain-parent/change-domain-parent.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-file": Parameters<
    typeof import("../../../agent/file-content/change-file/change-file.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-page-page-property": Parameters<
    typeof import("../../../agent/file-content/change-page-page-property/change-page-page-property.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-page-page-property-text": Parameters<
    typeof import("../../../agent/file-content/change-page-page-property-text/change-page-page-property-text.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-page-page-type": Parameters<
    typeof import("../../../agent/file/change-page-page-type/change-page-page-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-property-record-field": Parameters<
    typeof import("../../../agent/file-content/change-property-record-field/change-property-record-field.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-prose-pattern": Parameters<
    typeof import("../../../agent/prose/change-prose-pattern/change-prose-pattern.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/copy-property-on-every-page": Parameters<
    typeof import("../../../agent/page-type/copy-property-on-every-page/copy-property-on-every-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-code-export": Parameters<
    typeof import("../../../agent/file-content/move-code-export/move-code-export.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-folder": Parameters<
    typeof import("../../../agent/folder/move-folder/move-folder.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-folder-package": Parameters<
    typeof import("../../../agent/folder/move-folder-package/move-folder-package.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-page": Parameters<
    typeof import("../../../agent/file/move-page/move-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-pages": Parameters<
    typeof import("../../../agent/file/move-pages/move-pages.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-property-on-every-page": Parameters<
    typeof import("../../../agent/page-type/move-property-on-every-page/move-property-on-every-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/nest-commands": Parameters<
    typeof import("../../../agent/folder/nest-commands/nest-commands.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-every-page-of-a-type": Parameters<
    typeof import("../../../agent/page-type/remove-every-page-of-a-type/remove-every-page-of-a-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-file": Parameters<
    typeof import("../../../agent/file/remove-file/remove-file.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-folder": Parameters<
    typeof import("../../../agent/folder/remove-folder/remove-folder.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-folder-package": Parameters<
    typeof import("../../../agent/folder/remove-folder-package/remove-folder-package.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-package-alias": Parameters<
    typeof import("../../../agent/file-content/remove-package-alias/remove-package-alias.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-package-manifest": Parameters<
    typeof import("../../../agent/file/remove-package-manifest/remove-package-manifest.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-page": Parameters<
    typeof import("../../../agent/file/remove-page/remove-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-page-type": Parameters<
    typeof import("../../../agent/file/remove-page-type/remove-page-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-property-from-every-page": Parameters<
    typeof import("../../../agent/page-type/remove-property-from-every-page/remove-property-from-every-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-property-from-page-type": Parameters<
    typeof import("../../../agent/page-type/remove-property-from-page-type/remove-property-from-page-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-property-record": Parameters<
    typeof import("../../../agent/file-content/remove-property-record/remove-property-record.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-property-value": Parameters<
    typeof import("../../../agent/file-content/remove-property-value/remove-property-value.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/rename-code-token": Parameters<
    typeof import("../../../agent/file-content/rename-code-token/rename-code-token.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/rename-package": Parameters<
    typeof import("../../../agent/file-content/rename-package/rename-package.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/rename-page": Parameters<
    typeof import("../../../agent/file/rename-page/rename-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/rename-page-property-property-slug": Parameters<
    typeof import("../../../agent/page-property/rename-page-property-property-slug/rename-page-property-property-slug.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/rename-page-type": Parameters<
    typeof import("../../../agent/file/rename-page-type/rename-page-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/rename-pages": Parameters<
    typeof import("../../../agent/file/rename-pages/rename-pages.change-agent.code.ts")["runChange"]
  >[1]
}
