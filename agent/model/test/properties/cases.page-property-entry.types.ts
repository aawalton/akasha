import type { CaseAgainst } from "akasha/agent/model/test/properties/case-against.text-property.types.ts"
import type { CaseAnswer } from "akasha/agent/model/test/properties/case-answer.select-property.types.ts"
import type { CaseAsked } from "akasha/agent/model/test/properties/case-asked.text-property.types.ts"
import type { CasePage } from "akasha/agent/model/test/properties/case-page.text-property.types.ts"
import type { CaseStatement } from "akasha/agent/model/test/properties/case-statement.text-property.types.ts"
import type { Definition } from "akasha/domain/properties/definition.standard-agent-english-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"

export type Cases = "jsonl"

export type CasesRow = {
  id: Id
  page: CasePage
  definition: Definition
  asked?: CaseAsked
  statement: CaseStatement
  answer: CaseAnswer
  against?: CaseAgainst
}
