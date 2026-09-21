import {
  indexingOf,
  manifestIn,
  refusalsOver,
} from "akasha/check/code/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.check-code.decision.code.ts"
import {
  input,
  textNamed,
  textsBy,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const REACHING = textsBy(
  "the extension's manifest and every text",
  (path, shadow) => textNamed(path) || path === manifestIn(indexingOf(shadow))
)

export const extensionHostReachesNoBunCode = input(REACHING, (change, shadow) =>
  refusalsOver(change, shadow, manifestIn(indexingOf(shadow)))
)
