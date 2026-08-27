import { checkWorkflow } from "../../tools/lib/check-workflow/index.ts"
import type { DeclarationContext } from "../../tools/lib/workflow-dsl/discovery.ts"
import type { Workflow } from "../../tools/lib/workflow-dsl/types"

export default (context: DeclarationContext): Workflow => checkWorkflow(context.codeRoot)
