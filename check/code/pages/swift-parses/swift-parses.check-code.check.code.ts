import {
  refusalsOver,
  swiftNamed,
} from "akasha/check/code/pages/swift-parses/swift-parses.check-code.decision.code.ts"
import { filesBy, input } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const SWIFT_FILES = filesBy("Swift files", swiftNamed)

export const swiftParses = input(SWIFT_FILES, refusalsOver)
