import type { Workflow } from "@akasha/workflow-language/workflow-types"
import type { DeclarationContext } from "../../../../../tools/lib/workflow-dsl/discovery.ts"
import { checkWorkflow } from "../../tools/lib/check-workflow/index.ts"

export default (context: DeclarationContext): Workflow => checkWorkflow(context.codeRoot)
