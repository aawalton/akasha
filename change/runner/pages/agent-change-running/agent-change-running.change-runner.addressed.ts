export type Changes = {
  "change-agent/add-binary-file": Parameters<
    typeof import("akasha/change/agent/file/add-binary-file/add-binary-file.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-file": Parameters<
    typeof import("akasha/change/agent/file/add-file/add-file.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-file-property-extensions": Parameters<
    typeof import("akasha/change/agent/page-type/add-file-property-extensions/add-file-property-extensions.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-page-property": Parameters<
    typeof import("akasha/change/agent/page-property/add-page-property/add-page-property.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-page-property-types": Parameters<
    typeof import("akasha/change/agent/page-type/add-page-property-types/add-page-property-types.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-page-type-types": Parameters<
    typeof import("akasha/change/agent/page-type/add-page-type-types/add-page-type-types.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-property-record": Parameters<
    typeof import("akasha/change/agent/file-content/add-property-record/add-property-record.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-property-to-every-page": Parameters<
    typeof import("akasha/change/agent/page-type/add-property-to-every-page/add-property-to-every-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-property-to-page-type": Parameters<
    typeof import("akasha/change/agent/page-type/add-property-to-page-type/add-property-to-page-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-property-value": Parameters<
    typeof import("akasha/change/agent/file-content/add-property-value/add-property-value.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/add-property-values": Parameters<
    typeof import("akasha/change/agent/file-content/add-property-values/add-property-values.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/append-lines": Parameters<
    typeof import("akasha/change/agent/file-content/append-lines/append-lines.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/append-lines-from": Parameters<
    typeof import("akasha/change/agent/file-content/append-lines-from/append-lines-from.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-calculation-held-type": Parameters<
    typeof import("akasha/change/agent/page-type/change-calculation-held-type/change-calculation-held-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-domain-parent": Parameters<
    typeof import("akasha/change/agent/file-content/change-domain-parent/change-domain-parent.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-file": Parameters<
    typeof import("akasha/change/agent/file-content/change-file/change-file.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-page-page-property": Parameters<
    typeof import("akasha/change/agent/file-content/change-page-page-property/change-page-page-property.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-page-page-property-text": Parameters<
    typeof import("akasha/change/agent/file-content/change-page-page-property-text/change-page-page-property-text.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-page-page-type": Parameters<
    typeof import("akasha/change/agent/file/change-page-page-type/change-page-page-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-property-on-page-type": Parameters<
    typeof import("akasha/change/agent/page-type/change-property-on-page-type/change-property-on-page-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-property-record-field": Parameters<
    typeof import("akasha/change/agent/file-content/change-property-record-field/change-property-record-field.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/change-prose-pattern": Parameters<
    typeof import("akasha/change/agent/prose/change-prose-pattern/change-prose-pattern.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/copy-property-on-every-page": Parameters<
    typeof import("akasha/change/agent/page-type/copy-property-on-every-page/copy-property-on-every-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/divide-file-code": Parameters<
    typeof import("akasha/change/agent/file/divide-file-code/divide-file-code.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/divide-page-property": Parameters<
    typeof import("akasha/change/agent/file/divide-page-property/divide-page-property.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-code-export": Parameters<
    typeof import("akasha/change/agent/file-content/move-code-export/move-code-export.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-folder": Parameters<
    typeof import("akasha/change/agent/folder/move-folder/move-folder.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-page": Parameters<
    typeof import("akasha/change/agent/file/move-page/move-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-pages": Parameters<
    typeof import("akasha/change/agent/file/move-pages/move-pages.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-pages-under": Parameters<
    typeof import("akasha/change/agent/file/move-pages-under/move-pages-under.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-property-on-every-page": Parameters<
    typeof import("akasha/change/agent/page-type/move-property-on-every-page/move-property-on-every-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/move-property-value": Parameters<
    typeof import("akasha/change/agent/file-content/move-property-value/move-property-value.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/nest-modules": Parameters<
    typeof import("akasha/change/agent/folder/nest-modules/nest-modules.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/qualify-relation-on-every-page": Parameters<
    typeof import("akasha/change/agent/page-type/qualify-relation-on-every-page/qualify-relation-on-every-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-every-page-of-a-type": Parameters<
    typeof import("akasha/change/agent/page-type/remove-every-page-of-a-type/remove-every-page-of-a-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-file": Parameters<
    typeof import("akasha/change/agent/file/remove-file/remove-file.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-folder": Parameters<
    typeof import("akasha/change/agent/folder/remove-folder/remove-folder.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-page": Parameters<
    typeof import("akasha/change/agent/file/remove-page/remove-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-page-property": Parameters<
    typeof import("akasha/change/agent/page-property/remove-page-property/remove-page-property.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-page-type": Parameters<
    typeof import("akasha/change/agent/file/remove-page-type/remove-page-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-property-from-every-page": Parameters<
    typeof import("akasha/change/agent/page-type/remove-property-from-every-page/remove-property-from-every-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-property-from-page-type": Parameters<
    typeof import("akasha/change/agent/page-type/remove-property-from-page-type/remove-property-from-page-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-property-record": Parameters<
    typeof import("akasha/change/agent/file-content/remove-property-record/remove-property-record.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-property-value": Parameters<
    typeof import("akasha/change/agent/file-content/remove-property-value/remove-property-value.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/remove-unused-export-keywords": Parameters<
    typeof import("akasha/change/agent/file-content/remove-unused-export-keywords/remove-unused-export-keywords.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/rename-code-token": Parameters<
    typeof import("akasha/change/agent/file-content/rename-code-token/rename-code-token.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/rename-folder-imports": Parameters<
    typeof import("akasha/change/agent/file-content/rename-folder-imports/rename-folder-imports.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/rename-page": Parameters<
    typeof import("akasha/change/agent/file/rename-page/rename-page.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/rename-page-property-property-slug": Parameters<
    typeof import("akasha/change/agent/page-property/rename-page-property-property-slug/rename-page-property-property-slug.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/rename-page-type": Parameters<
    typeof import("akasha/change/agent/page-type/rename-page-type/rename-page-type.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/rename-pages": Parameters<
    typeof import("akasha/change/agent/file/rename-pages/rename-pages.change-agent.code.ts")["runChange"]
  >[1]
  "change-agent/sort-property-values-on-every-page": Parameters<
    typeof import("akasha/change/agent/page-type/sort-property-values-on-every-page/sort-property-values-on-every-page.change-agent.code.ts")["runChange"]
  >[1]
}
