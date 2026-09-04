import type { Finding } from "../finding.page-type.ts"

export const anEsoClassChainCannotBeTyped = {
  id: "01a06279-2828-79a7-8330-d584c5df55ef",
  pageTypeSlug: "finding",
  slug: "an-eso-class-chain-cannot-be-typed",
  domainSlug: "domain/temper",
  claim:
    "A shape below another cannot name a narrower receiver, so an ESO class chain lands as a keyed table.",
  evidence:
    "LibScrollableMenu subclasses ZO_ComboBox four deep, and each level redeclares AddMenuItems and Initialize on the instance it runs on. Lua reads those as methods, and TypeScript reads a method signature the same loose way, which is why the library's own source compiled. `no-method-signature` turns each one into a property holding a function type, and a property is strict about its receiver: ContextMenuObject can no longer be handed in where ComboBoxObject is asked for. Landing this library took three separate answers. A member two sibling shapes both declare took `this: unknown` on both. A member a shape below restates took the receiver its base names. A class shape stopped naming the class shape above it as a base and took `[key: string]: unknown`, which is what the game hands around anyway, but which leaves ContextMenuClass saying nothing about the twenty-seven members ComboBoxClass names. Every ESO library with a class chain will meet this.",
} as const satisfies Finding
