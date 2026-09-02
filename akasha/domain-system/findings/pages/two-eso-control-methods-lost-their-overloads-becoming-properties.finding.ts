import type { Finding } from "../finding.page-type.ts"

export const twoEsoControlMethodsLostTheirOverloadsBecomingProperties = {
  id: "01a060ae-70df-7a01-92b4-ab5c5d025104",
  pageTypeSlug: "finding",
  slug: "two-eso-control-methods-lost-their-overloads-becoming-properties",
  domainSlug: "domain/temper",
  claim:
    "The landed @akasha/temper-eso-types set writes each game method as an arrow property rather than as a method. Methods of one interface name declared in two files merge as overloads; properties of one interface name declared in two files collide. Control.SetHandler and ButtonControl.SetState now each answer TS2717, and only the narrower declaration reaches a caller. Every addon calling SetHandler with two arguments, the form the old set accepted, is refused TS2554.",
  evidence:
    "Measured on the landed set. `bunx @typescript/native-preview --noEmit --strict` over eso-ui/eso-ui.type-declaration.d.ts and eso-ui-2/eso-ui-2.type-declaration.d.ts alone answers two TS2717 at eso-ui-2 lines 45 and 54: SetHandler must be `(event, handler) => void` but here is `(event, handler, name) => void`, and SetState must be `(state, locked?) => void` but here is `(state) => void`. The old set wrote both as methods, at temper/addons/types/eso/ui.d.ts line 27 and ui-2.d.ts line 45, so TypeScript merged them into overloads and both call shapes bound. A third declaration, eso-objects-01 line 116, writes the five-parameter form with every parameter optional. A recreation of temper/shared-interface-hud-window as akasha/temper/temper-hud-window answers no TS2304 at all, so every global that package reaches is in the shared set, and its only three refusals are TS2554 at movable-window lines 26, 29 and 33, each a two-argument SetHandler. That package is written and proven but not landed, and its tree is staged. Three consumers wait behind it: game-items-addon, game-items-filters-addon and player-completion-addon. The mend is one declaration of each name with the later parameters optional, in one file rather than two.",
} as const satisfies Finding
