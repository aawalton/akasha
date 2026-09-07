export type Changes = {
  "change-authored/add-file": Parameters<
    typeof import("../../../authored/pages/add-file/add-file.change-authored.code.ts")["runChange"]
  >[1]
  "change-authored/change-file": Parameters<
    typeof import("../../../authored/pages/change-file/change-file.change-authored.code.ts")["runChange"]
  >[1]
  "change-checked/change-page-page-type": Parameters<
    typeof import("../../../checked/pages/change-page-page-type/change-page-page-type.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/change-page-property": Parameters<
    typeof import("../../../checked/pages/change-page-property/change-page-property.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/move-page": Parameters<
    typeof import("../../../checked/pages/move-page/move-page.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/remove-page": Parameters<
    typeof import("../../../checked/pages/remove-page/remove-page.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/remove-page-type": Parameters<
    typeof import("../../../checked/pages/remove-page-type/remove-page-type.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/rename-code-token": Parameters<
    typeof import("../../../checked/pages/rename-code-token/rename-code-token.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/rename-page": Parameters<
    typeof import("../../../checked/pages/rename-page/rename-page.change-checked.code.ts")["runChange"]
  >[1]
  "change-mechanical/add-file": Parameters<
    typeof import("../../../mechanical/pages/add-file/add-file.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/add-property-value": Parameters<
    typeof import("../../../mechanical/pages/add-property-value/add-property-value.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/change-file": Parameters<
    typeof import("../../../mechanical/pages/change-file/change-file.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/change-page-property": Parameters<
    typeof import("../../../mechanical/pages/change-page-property/change-page-property.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/change-page-property-relation": Parameters<
    typeof import("../../../mechanical/pages/change-page-property-relation/change-page-property-relation.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/move-file": Parameters<
    typeof import("../../../mechanical/pages/move-file/move-file.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/remove-file": Parameters<
    typeof import("../../../mechanical/pages/remove-file/remove-file.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/remove-page": Parameters<
    typeof import("../../../mechanical/pages/remove-page/remove-page.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/remove-page-type": Parameters<
    typeof import("../../../mechanical/pages/remove-page-type/remove-page-type.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/remove-property-value": Parameters<
    typeof import("../../../mechanical/pages/remove-property-value/remove-property-value.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/rename-export": Parameters<
    typeof import("../../../mechanical/pages/rename-export/rename-export.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/rename-local-variable": Parameters<
    typeof import("../../../mechanical/pages/rename-local-variable/rename-local-variable.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/rename-page-slug": Parameters<
    typeof import("../../../mechanical/pages/rename-page-slug/rename-page-slug.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/rename-path": Parameters<
    typeof import("../../../mechanical/pages/rename-path/rename-path.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/rename-property-signature": Parameters<
    typeof import("../../../mechanical/pages/rename-property-signature/rename-property-signature.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/repoint-imports": Parameters<
    typeof import("../../../mechanical/pages/repoint-imports/repoint-imports.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/respell-export": Parameters<
    typeof import("../../../mechanical/pages/respell-export/respell-export.change-mechanical.code.ts")["runChange"]
  >[1]
}
