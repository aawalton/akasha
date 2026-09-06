export type Changes = {
  "change-command/add-file": Parameters<
    typeof import("../../../command/pages/add-file/add-file.change-command.code.ts")["runChange"]
  >[1]
  "change-command/change-file": Parameters<
    typeof import("../../../command/pages/change-file/change-file.change-command.code.ts")["runChange"]
  >[1]
  "change-command/move-page": Parameters<
    typeof import("../../../command/pages/move-page/move-page.change-command.code.ts")["runChange"]
  >[1]
  "change-command/remove-page": Parameters<
    typeof import("../../../command/pages/remove-page/remove-page.change-command.code.ts")["runChange"]
  >[1]
  "change-command/remove-page-type": Parameters<
    typeof import("../../../command/pages/remove-page-type/remove-page-type.change-command.code.ts")["runChange"]
  >[1]
  "change/add-file": Parameters<
    typeof import("../../../pages/add-file/add-file.change.code.ts")["runChange"]
  >[1]
  "change/change-file": Parameters<
    typeof import("../../../pages/change-file/change-file.change.code.ts")["runChange"]
  >[1]
  "change/move-file": Parameters<
    typeof import("../../../pages/move-file/move-file.change.code.ts")["runChange"]
  >[1]
  "change/remove-file": Parameters<
    typeof import("../../../pages/remove-file/remove-file.change.code.ts")["runChange"]
  >[1]
  "change/remove-page": Parameters<
    typeof import("../../../pages/remove-page/remove-page.change.code.ts")["runChange"]
  >[1]
  "change/remove-page-type": Parameters<
    typeof import("../../../pages/remove-page-type/remove-page-type.change.code.ts")["runChange"]
  >[1]
  "change/remove-property-value": Parameters<
    typeof import("../../../pages/remove-property-value/remove-property-value.change.code.ts")["runChange"]
  >[1]
  "change/rename-code-token": Parameters<
    typeof import("../../../pages/rename-code-token/rename-code-token.change.code.ts")["runChange"]
  >[1]
  "change/rename-export": Parameters<
    typeof import("../../../pages/rename-export/rename-export.change.code.ts")["runChange"]
  >[1]
  "change/rename-local-variable": Parameters<
    typeof import("../../../pages/rename-local-variable/rename-local-variable.change.code.ts")["runChange"]
  >[1]
  "change/rename-page": Parameters<
    typeof import("../../../pages/rename-page/rename-page.change.code.ts")["runChange"]
  >[1]
  "change/rename-page-slug": Parameters<
    typeof import("../../../pages/rename-page-slug/rename-page-slug.change.code.ts")["runChange"]
  >[1]
  "change/rename-path": Parameters<
    typeof import("../../../pages/rename-path/rename-path.change.code.ts")["runChange"]
  >[1]
  "change/rename-property-signature": Parameters<
    typeof import("../../../pages/rename-property-signature/rename-property-signature.change.code.ts")["runChange"]
  >[1]
  "change/repoint-imports": Parameters<
    typeof import("../../../pages/repoint-imports/repoint-imports.change.code.ts")["runChange"]
  >[1]
  "change/respell-export": Parameters<
    typeof import("../../../pages/respell-export/respell-export.change.code.ts")["runChange"]
  >[1]
  "change/restate-value": Parameters<
    typeof import("../../../pages/restate-value/restate-value.change.code.ts")["runChange"]
  >[1]
}
