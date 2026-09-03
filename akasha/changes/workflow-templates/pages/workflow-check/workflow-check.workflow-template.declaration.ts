import type { DeclarationContext } from "../../../../../tools/lib/workflow-dsl/discovery.ts"
import type { Workflow } from "../../../../../tools/lib/workflow-dsl/types"
import { checkWorkflow } from "../../tools/lib/check-workflow/index.ts"

export default (context: DeclarationContext): Workflow => checkWorkflow(context.codeRoot)
