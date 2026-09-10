import {
  everyFileOf,
  input,
  textNamed,
  textsBy,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  MANIFEST,
  refusalsOver,
} from "./extension-host-reaches-no-bun-code.code-check.decision.code.ts"

const REACHING = textsBy(
  "the extension's manifest and every text",
  (path) => textNamed(path) || path === MANIFEST
)

export const extensionHostReachesNoBunCode = input(REACHING, (change, shadow) =>
  refusalsOver(change, everyFileOf(shadow.index))
)
