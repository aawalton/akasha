import { DECLARED_EFFECTS_VERB_ID } from "akasha/page/core/schema/modules/action-button-config/action-button-config.module.code.ts"
import {
  type ActionVerbContext,
  type ActionVerbHandler,
  registerActionVerb,
} from "akasha/page/ui/action-verb/modules/action-verb-registry/action-verb-registry.module.code.ts"

const declaredEffectsHandler: ActionVerbHandler = (_ctx: ActionVerbContext) => {}

registerActionVerb(DECLARED_EFFECTS_VERB_ID, declaredEffectsHandler)
