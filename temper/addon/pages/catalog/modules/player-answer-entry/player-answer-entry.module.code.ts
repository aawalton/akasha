import { ADDON_NAME } from "akasha/temper/addon/pages/catalog/modules/catalog-constants/catalog-constants.module.code.ts"
import { capturePlayerAnswers } from "akasha/temper/capture/player-answer/modules/player-answer-capture/player-answer-capture.module.code.ts"
import {
  PLAYER_ANSWER_CAPTURE_DESCRIPTOR,
  type PlayerAnswerPayload,
  type PlayerAnswers,
} from "akasha/temper/capture/player-answer/modules/player-answer-descriptor/player-answer-descriptor.module.code.ts"
import {
  type CaptureWriter,
  defineCaptureWriter,
} from "akasha/temper/capture/writer/modules/capture-writer/capture-writer.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const NAMESPACE = `${ADDON_NAME}PlayerAnswers`

const START_DELAY = 20000

defineCaptureWriter(
  PLAYER_ANSWER_CAPTURE_DESCRIPTOR,
  function (this: void, writer: CaptureWriter<PlayerAnswerPayload>): undefined {
    EVENT_MANAGER.RegisterForEvent(
      NAMESPACE,
      EVENT_PLAYER_ACTIVATED,
      function (this: void): undefined {
        EVENT_MANAGER.UnregisterForEvent(NAMESPACE, EVENT_PLAYER_ACTIVATED)
        zo_callLater(function (this: void): undefined {
          capturePlayerAnswers(function (this: void, answers: PlayerAnswers): undefined {
            const saved = writer.getSavedVariables()
            saved.answers = answers
            saved.apiVersion = GetAPIVersion()
            saved.takenAt = GetTimeStamp()
            return undefined
          })
          return undefined
        }, START_DELAY)
      }
    )
  }
)
