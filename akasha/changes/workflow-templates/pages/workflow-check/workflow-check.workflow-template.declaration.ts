import type { Workflow } from "@akasha/workflow-language/workflow-types"
import { checkWorkflow } from "../../../../../tools/lib/check-workflow/index.ts"
import type { DeclarationContext } from "../../../../../tools/lib/workflow-dsl/discovery.ts"

export default (context: DeclarationContext): Workflow => checkWorkflow(context.codeRoot)
