import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/lib-group-broadcast/lib-group-broadcast.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchBroadcast {
    SendCurseExplosion: (this: void) => void
  }
}

const BC = CRUTCH.Broadcast

let rgProtocol: GroupBroadcastProtocol | undefined

const HEADING_PRECISION = 10000

function onCurseHeading(
  this: void,
  unitTag: string,
  data: Readonly<Record<string, number>>
): undefined {
  if (!DoesUnitExist(unitTag)) return

  const x = data.x as number
  const y = data.y as number
  const z = data.z as number
  const heading = data.heading as number

  CRUTCH.dbgOther(
    string.format(
      "Received curse data from %s: {%d, %d, %d} %f",
      GetUnitDisplayName(unitTag),
      x,
      y,
      z,
      heading / HEADING_PRECISION
    )
  )

  CRUTCH.OnGroupMemberCurseReceived(unitTag, x, y, z, heading / HEADING_PRECISION)
}

function sendCurseExplosion(this: void): undefined {
  if (rgProtocol === undefined) {
    CRUTCH.dbgSpam("Can't send heading because no LibGroupBroadcast")
    return
  }

  const [, x, y, z] = GetUnitRawWorldPosition("player")
  const [, , heading] = GetMapPlayerPosition("player")

  rgProtocol.Send({
    x: x,
    y: y,
    z: z,
    heading: heading * HEADING_PRECISION,
  })
}

BC.SendCurseExplosion = sendCurseExplosion

const CURSE_PROTOCOL_ID = 210

CRUTCH.InitializeBroadcast = function (this: void) {
  const lgb = LibGroupBroadcast

  if (lgb === undefined) {
    CRUTCH.dbgSpam("No LibGroupBroadcast for data sharing.")
    return
  }

  const handler = lgb.RegisterHandler("TemperCombatAlerts")
  handler.SetDisplayName("Temper Combat Alerts")
  handler.SetDescription("'Tis a crutch. Shares info for combat events in PvE content.")

  const protocol = handler.DeclareProtocol(CURSE_PROTOCOL_ID, "CurseExplosionProtocol")
  rgProtocol = protocol
  protocol.AddField(lgb.CreateNumericField("x"))
  protocol.AddField(lgb.CreateNumericField("y"))
  protocol.AddField(lgb.CreateNumericField("z"))
  protocol.AddField(lgb.CreateNumericField("heading"))

  protocol.OnData(onCurseHeading)

  protocol.Finalize({
    isRelevantInCombat: true,
  })
}
