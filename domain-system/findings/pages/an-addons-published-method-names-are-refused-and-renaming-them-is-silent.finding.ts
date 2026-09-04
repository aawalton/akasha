import type { Finding } from "../finding.page-type.ts"

export const anAddonsPublishedMethodNamesAreRefusedAndRenamingThemIsSilent = {
  id: "01a061cb-6408-70e2-b432-6ec8282a8cbb",
  pageTypeSlug: "finding",
  slug: "an-addons-published-method-names-are-refused-and-renaming-them-is-silent",
  domainSlug: "domain/temper",
  claim:
    "An ESO addon library publishes its methods in PascalCase, because the game and the libraries calling them spell the keys that way. `name-format/lower-camel-case` refuses every one. Renaming the binding is safe, renaming the key breaks the addon at run time, and the two are told apart only by where the name sits. No check in akasha catches the wrong one, so the refusal pushes toward a silent regression.",
  evidence:
    "temper/shared-addon-libraries-lib-addon-menu-order-list-box refuses on 19 exported functions: Populate, UpdateScrollList, RowSetupFunction, OnRowSelected, MoveItem, GetCurrentEntries, AddNewEntry, RemoveValue, StartDragging, StopDragging and nine more. Each is both a binding and a key. src/order-list-box.ts builds the widget from an object literal using shorthand, so one identifier is the exported function and the property LibAddonMenu-2.0 and ESO's scroll list invoke. A regular expression renaming the binding rewrites the key too, and the widget then answers nothing when LAM calls orderListBox:Populate().\n\nThe safe recreation expands the shorthand: `Populate: populate,`. Telling a shorthand key from an argument, an import specifier and an interface member is what makes the rename more than a substitution. The interface `OrderListBox` in src/types.ts declares the same 19 names as members, and those members must keep their case, since they describe the object the game holds.\n\nThis was found while moving the four ESO menu addon libraries. temper-lib-main-menu landed at cc1524c98f because it publishes one global object and declares its methods in an interface rather than exporting them as functions, so the rule never fires. The other three all export PascalCase functions: order-list-box 19, shared-addon-libraries-lib-addon-menu across 19 widget and panel modules, and shared-addon-libraries-lib-scrollable-menu across its dropdown and combobox classes. The same shape is in every addon that publishes an object the game calls.",
} as const satisfies Finding
