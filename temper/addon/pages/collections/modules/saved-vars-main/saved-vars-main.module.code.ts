import { installData } from "akasha/temper/addon/pages/collections/modules/saved-vars-data/saved-vars-data.module.code.ts"
import { installLibCore } from "akasha/temper/addon/pages/collections/modules/saved-vars-lib-core/saved-vars-lib-core.module.code.ts"
import { installLibOverrides } from "akasha/temper/addon/pages/collections/modules/saved-vars-lib-overrides/saved-vars-lib-overrides.module.code.ts"
import { installSavedVarsManager } from "akasha/temper/addon/pages/collections/modules/saved-vars-manager/saved-vars-manager.module.code.ts"
import { installProtected } from "akasha/temper/addon/pages/collections/modules/saved-vars-protected/saved-vars-protected.module.code.ts"

installLibCore()
installProtected()
installSavedVarsManager()
installData()
installLibOverrides()
