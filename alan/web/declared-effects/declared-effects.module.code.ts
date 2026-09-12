import { DECLARED_EFFECTS_VERB_ID } from "akasha/pages/core/schema/modules/action-button-config/action-button-config.module.code.ts"
import {
  type ActionVerbContext,
  type ActionVerbHandler,
  registerActionVerb,
} from "akasha/pages/ui/action-verbs/modules/action-verb-registry/action-verb-registry.module.code.ts"

const declaredEffectsHandler: ActionVerbHandler = (_ctx: ActionVerbContext) => {}

registerActionVerb(DECLARED_EFFECTS_VERB_ID, declaredEffectsHandler)
