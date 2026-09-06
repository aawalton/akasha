export type Changes = {
  "change-command/remove-page": Parameters<
    typeof import("../../../command/pages/remove-page/remove-page.change-command.code.ts")["runChange"]
  >[1]
}
