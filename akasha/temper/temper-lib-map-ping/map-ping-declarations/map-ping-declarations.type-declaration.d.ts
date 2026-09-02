interface WorldMapManagerControl {
  UnregisterForEvent: (this: WorldMapManagerControl, event: number) => boolean
}

interface WorldMapManager {
  control: WorldMapManagerControl
}

declare const WORLD_MAP_MANAGER: WorldMapManager
