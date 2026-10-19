import { capturePlayerAnswers } from "akasha/temper/capture/player-answer/modules/player-answer-capture/player-answer-capture.module.code.ts"
import {
  PLAYER_ANSWERS_VERSION,
  type PlayerAnswers,
} from "akasha/temper/capture/player-answer/modules/player-answer-descriptor/player-answer-descriptor.module.code.ts"
import { registerCatalogDomain } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

function collectPlayerAnswerCatalog(this: void, onComplete: (this: void) => void): undefined {
  capturePlayerAnswers(function (this: void, answers: PlayerAnswers): undefined {
    const [screenWidth, screenHeight] = GuiRoot.GetDimensions()
    getSavedVariables().playerAnswerCatalog = {
      version: PLAYER_ANSWERS_VERSION,
      apiVersion: GetAPIVersion(),
      takenAt: GetTimeStamp(),
      screenWidth,
      screenHeight,
      answers,
    }
    onComplete()
    return undefined
  })
  return undefined
}

registerCatalogDomain({ key: "playerAnswerCatalog", collect: collectPlayerAnswerCatalog })
