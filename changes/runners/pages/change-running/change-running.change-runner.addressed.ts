export type Changes = {
  "change-authored/add-file": Parameters<
    typeof import("../../../command/pages/add-file/add-file.change-authored.code.ts")["runChange"]
  >[1]
  "change-authored/change-file": Parameters<
    typeof import("../../../command/pages/change-file/change-file.change-authored.code.ts")["runChange"]
  >[1]
  "change-checked/change-page-page-type": Parameters<
    typeof import("../../../checked/pages/change-page-page-type/change-page-page-type.change-checked.code.ts")["runChange"]
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
    typeof import("../../../pages/rename-code-token/rename-code-token.change-checked.code.ts")["runChange"]
  >[1]
  "change-checked/rename-page": Parameters<
    typeof import("../../../pages/rename-page/rename-page.change-checked.code.ts")["runChange"]
  >[1]
  "change-mechanical/add-file": Parameters<
    typeof import("../../../pages/add-file/add-file.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/change-file": Parameters<
    typeof import("../../../pages/change-file/change-file.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/move-file": Parameters<
    typeof import("../../../pages/move-file/move-file.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/remove-file": Parameters<
    typeof import("../../../pages/remove-file/remove-file.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/remove-page": Parameters<
    typeof import("../../../pages/remove-page/remove-page.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/remove-page-type": Parameters<
    typeof import("../../../pages/remove-page-type/remove-page-type.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/remove-property-value": Parameters<
    typeof import("../../../pages/remove-property-value/remove-property-value.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/rename-export": Parameters<
    typeof import("../../../pages/rename-export/rename-export.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/rename-local-variable": Parameters<
    typeof import("../../../pages/rename-local-variable/rename-local-variable.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/rename-page-slug": Parameters<
    typeof import("../../../pages/rename-page-slug/rename-page-slug.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/rename-path": Parameters<
    typeof import("../../../pages/rename-path/rename-path.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/rename-property-signature": Parameters<
    typeof import("../../../pages/rename-property-signature/rename-property-signature.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/repoint-imports": Parameters<
    typeof import("../../../pages/repoint-imports/repoint-imports.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/respell-export": Parameters<
    typeof import("../../../pages/respell-export/respell-export.change-mechanical.code.ts")["runChange"]
  >[1]
  "change-mechanical/restate-value": Parameters<
    typeof import("../../../pages/restate-value/restate-value.change-mechanical.code.ts")["runChange"]
  >[1]
}
