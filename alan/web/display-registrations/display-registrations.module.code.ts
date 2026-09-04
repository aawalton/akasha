import { registerPageDisplay } from "@akasha/pages-ui/capabilities/page-display-registry"

registerPageDisplay("idle", { offlineCapable: false })
registerPageDisplay("chess", { offlineCapable: true })
registerPageDisplay("chess-review", { offlineCapable: true })
registerPageDisplay("persona", { offlineCapable: false })
