import "akasha/alan/web/modules/idle-train-verb/idle-train-verb.module.code.ts"
import "akasha/alan/web/modules/idle-train10-verb/idle-train10-verb.module.code.ts"
import "akasha/alan/web/modules/idle-trainmax-verb/idle-trainmax-verb.module.code.ts"
import "akasha/alan/web/modules/idle-remove-verb/idle-remove-verb.module.code.ts"
import "akasha/alan/web/modules/idle-lock-verb/idle-lock-verb.module.code.ts"
import "akasha/alan/web/modules/idle-reorder-verb/idle-reorder-verb.module.code.ts"
import "akasha/alan/web/modules/declared-effects/declared-effects.module.code.ts"

import { ROSTER_GALLERY_CAPABILITY } from "akasha/alan/web/modules/idle-card-page-type/idle-card-page-type.module.code.ts"
import { RevealHost } from "akasha/alan/web/modules/reveal-host/reveal-host.module.code.tsx"
import { RosterGalleryHost } from "akasha/alan/web/modules/roster-gallery/roster-gallery.module.code.tsx"
import { registerCapabilityHost } from "akasha/page/ui/capability/modules/capability-hosts/capability-hosts.module.code.tsx"

registerCapabilityHost(ROSTER_GALLERY_CAPABILITY, RosterGalleryHost)
registerCapabilityHost("reveal", RevealHost)
