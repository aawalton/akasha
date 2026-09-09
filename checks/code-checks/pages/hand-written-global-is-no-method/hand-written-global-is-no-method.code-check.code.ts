import {
  input,
  textIn,
  textsBy,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  AMBIENT,
  DECLARATION,
  HELD,
  refusalsOver,
} from "./hand-written-global-is-no-method.code-check.decision.code.ts"

const PAGE_TAIL = `.${DECLARATION}.${HELD}`

const BESIDE_TAIL = `.${DECLARATION}.${AMBIENT}.${HELD}`

const DECLARATIONS = textsBy(
  "type declarations and the declaration files beside them",
  (path) => path.endsWith(PAGE_TAIL) || path.endsWith(BESIDE_TAIL)
)

export const handWrittenGlobalIsNoMethod = input(DECLARATIONS, (change, shadow) =>
  refusalsOver(shadow, (path) => textIn(change, path))
)
