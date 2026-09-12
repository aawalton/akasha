import { registerPageDisplay } from "akasha/pages/ui/capabilities/modules/page-display-registry/page-display-registry.module.code.ts"

registerPageDisplay("idle", { offlineCapable: false })
registerPageDisplay("chess", { offlineCapable: true })
registerPageDisplay("chess-review", { offlineCapable: true })
registerPageDisplay("persona", { offlineCapable: false })
