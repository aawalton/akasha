import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

let initialized = false
let renderSpace: Control
let controlContainer: TopLevelWindow

CRUTCH.InitializeLineRenderSpace = () => {
  if (initialized) {
    return
  }

  renderSpace = WINDOW_MANAGER.CreateControl(
    "TemperCombatAlertsLineRenderSpace",
    GuiRoot,
    CT_CONTROL
  )
  renderSpace.SetAnchorFill(GuiRoot)
  renderSpace.Create3DRenderSpace()
  renderSpace.SetHidden(true)

  controlContainer = WINDOW_MANAGER.CreateTopLevelWindow("TemperCombatAlertsLineContainer")
  controlContainer.SetAnchorFill(GuiRoot)
  controlContainer.SetMouseEnabled(false)
  controlContainer.SetMovable(false)
  controlContainer.SetDrawLayer(DL_BACKGROUND)
  controlContainer.SetDrawTier(DT_LOW)
  controlContainer.SetDrawLevel(0)

  const fragment = ZO_SimpleSceneFragment.New(controlContainer)
  HUD_UI_SCENE.AddFragment(fragment)
  HUD_SCENE.AddFragment(fragment)
}

let i11 = 0
let i12 = 0
let i13 = 0
let i21 = 0
let i22 = 0
let i23 = 0
let i31 = 0
let i32 = 0
let i33 = 0
let i41 = 0
let i42 = 0
let i43 = 0

function calculateMatrix(this: void): undefined {
  Set3DRenderSpaceToCurrentCamera(renderSpace.GetName())

  const [oX, oY, oZ] = renderSpace.Get3DRenderSpaceOrigin()
  const [cX, cY, cZ] = GuiRender3DPositionToWorldPosition(oX, oY, oZ)
  const [fX, fY, fZ] = renderSpace.Get3DRenderSpaceForward()
  const [rX, rY, rZ] = renderSpace.Get3DRenderSpaceRight()
  const [uX, uY, uZ] = renderSpace.Get3DRenderSpaceUp()

  i11 = -(uY * fZ - uZ * fY)
  i12 = -(rZ * fY - rY * fZ)
  i13 = -(rY * uZ - rZ * uY)
  i21 = -(uZ * fX - uX * fZ)
  i22 = -(rX * fZ - rZ * fX)
  i23 = -(rZ * uX - rX * uZ)
  i31 = -(uX * fY - uY * fX)
  i32 = -(rY * fX - rX * fY)
  i33 = -(rX * uY - rY * uX)
  i41 = -(uZ * fY * cX + uY * fX * cZ + uX * fZ * cY - uX * fY * cZ - uY * fZ * cX - uZ * fX * cY)
  i42 = -(rX * fY * cZ + rY * fZ * cX + rZ * fX * cY - rZ * fY * cX - rY * fX * cZ - rX * fZ * cY)
  i43 = -(rZ * uY * cX + rY * uX * cZ + rX * uZ * cY - rX * uY * cZ - rY * uZ * cX - rZ * uX * cY)
}

function getViewCoordinates(
  this: void,
  wX: number,
  wY: number,
  wZ: number
): LuaMultiReturn<[number, number, number]> {
  const pX = wX * i11 + wY * i21 + wZ * i31 + i41
  const pY = wX * i12 + wY * i22 + wZ * i32 + i42
  const pZ = wX * i13 + wY * i23 + wZ * i33 + i43
  return $multi(pX, pY, pZ)
}

function getLineViewCoordinates(
  this: void,
  worldX1: number,
  worldY1: number,
  worldZ1: number,
  worldX2: number,
  worldY2: number,
  worldZ2: number
): LuaMultiReturn<[number, number, number, number] | [undefined]> {
  let [pX1, pY1, pZ1] = getViewCoordinates(worldX1, worldY1, worldZ1)
  let [pX2, pY2, pZ2] = getViewCoordinates(worldX2, worldY2, worldZ2)

  const nearZ = 0.1
  if (pZ1 < nearZ && pZ2 < nearZ) {
    return $multi(undefined)
  }
  if (pZ1 < 0 || pZ2 < 0) {
    const t = (nearZ - pZ1) / (pZ2 - pZ1)
    const clipX = pX1 + t * (pX2 - pX1)
    const clipY = pY1 + t * (pY2 - pY1)
    if (pZ1 < 0) {
      pX1 = clipX
      pY1 = clipY
      pZ1 = nearZ
    } else {
      pX2 = clipX
      pY2 = clipY
      pZ2 = nearZ
    }
  }

  const [w1, h1] = GetWorldDimensionsOfViewFrustumAtDepth(pZ1)
  const [w2, h2] = GetWorldDimensionsOfViewFrustumAtDepth(pZ2)

  const [uiW, uiH] = GuiRoot.GetDimensions()

  return $multi((pX1 * uiW) / w1, (-pY1 * uiH) / h1, (pX2 * uiW) / w2, (-pY2 * uiH) / h2)
}

const LINES: Record<number, Control> = {}

function getLineControl(this: void, num: number): Control {
  let line = LINES[num]
  if (line === undefined) {
    CRUTCH.dbgSpam("|cFF0000creating new line " + tostring(num))
    line = WINDOW_MANAGER.CreateControl(
      "$(parent)CrutchTetherLine" + tostring(num),
      controlContainer,
      CT_CONTROL
    )
    const backdrop = WINDOW_MANAGER.CreateControl("$(parent)Backdrop", line, CT_BACKDROP)
    backdrop.ClearAnchors()
    backdrop.SetAnchorFill()
    backdrop.SetCenterColor(1, 0, 1, 1)
    backdrop.SetEdgeColor(1, 1, 1, 1)

    const distanceLabel = WINDOW_MANAGER.CreateControl("$(parent)Label", line, CT_LABEL)
    distanceLabel.ClearAnchors()
    distanceLabel.SetAnchor(CENTER, line, CENTER)
    distanceLabel.SetFont("$(BOLD_FONT)|30|outline")
    distanceLabel.SetText("42m")

    LINES[num] = line
  }

  return line
}

function drawLineBetween2DPoints(
  this: void,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  lineNum: number
): undefined {
  const line = getLineControl(lineNum)

  const centerX = (x1 + x2) / 2
  const centerY = (y1 + y2) / 2
  line.ClearAnchors()
  line.SetAnchor(CENTER, GuiRoot, CENTER, centerX, centerY)

  const x = x2 - x1
  const y = y2 - y1
  const length = math.sqrt(x * x + y * y)
  line.SetDimensions(length, 10)
  const angle = math.atan2(y, x)
  line.SetTransformRotationZ(-angle)
}

CRUTCH.SetLineColor = (r, g, b, a, edgeA, showLabel, lineNumArg) => {
  const line = getLineControl(lineNumArg ?? 1)
  const backdrop = line.GetNamedChild("Backdrop") as BackdropControl
  backdrop.SetCenterColor(r, g, b, a ?? 1)
  backdrop.SetEdgeColor(1, 1, 1, edgeA ?? 1)

  const label = line.GetNamedChild("Label") as LabelControl
  if (showLabel === true) {
    label.SetHidden(false)
  } else {
    label.SetHidden(true)
  }
}

const ACTIVE_LINE_FUNCTIONS: Record<number, () => void> = {}

function onUpdate(this: void): undefined {
  calculateMatrix()
  for (const [, lineFunction] of pairs(ACTIVE_LINE_FUNCTIONS)) {
    lineFunction()
  }
}

function stopPolling(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "PollLine")
}

function startPolling(this: void): undefined {
  stopPolling()
  EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "PollLine", 10, onUpdate)
}

function drawLineBetween3DPoints(
  this: void,
  worldX1: number,
  worldY1: number,
  worldZ1: number,
  worldX2: number,
  worldY2: number,
  worldZ2: number,
  lineNum: number
): boolean {
  const [x1, y1, x2, y2] = getLineViewCoordinates(
    worldX1,
    worldY1,
    worldZ1,
    worldX2,
    worldY2,
    worldZ2
  )

  if (x1 === undefined) {
    return false
  }

  drawLineBetween2DPoints(x1, y1 as number, x2 as number, y2 as number, lineNum)
  return true
}

CRUTCH.DrawLineBetweenPlayers = (unitTag1, unitTag2, distanceCallback, lineNumArg) => {
  CRUTCH.dbgOther(
    zo_strformat(
      "drawing line between <<1>> and <<2>>",
      GetUnitDisplayName(unitTag1),
      GetUnitDisplayName(unitTag2)
    )
  )

  const lineNum = lineNumArg ?? 1
  const line = getLineControl(lineNum)
  line.SetHidden(false)

  const myLineFunction = () => {
    const [, worldX1, worldY1, worldZ1] = GetUnitRawWorldPosition(unitTag1)
    const [, worldX2, worldY2, worldZ2] = GetUnitRawWorldPosition(unitTag2)
    const visible = drawLineBetween3DPoints(
      worldX1,
      worldY1 + 100,
      worldZ1,
      worldX2,
      worldY2 + 100,
      worldZ2,
      lineNum
    )
    line.SetHidden(!visible)

    const dist = CRUTCH.GetUnitTagsDistance(unitTag1, unitTag2)
    ;(line.GetNamedChild("Label") as LabelControl).SetText(string.format("%.02f m", dist))

    if (distanceCallback !== undefined) {
      distanceCallback(dist)
    }
  }

  ACTIVE_LINE_FUNCTIONS[lineNum] = myLineFunction
  startPolling()
}

CRUTCH.DrawLineWithProvider = (endpointsProvider, lineNumArg) => {
  CRUTCH.dbgOther("drawing line based on callback")
  const lineNum = lineNumArg ?? 1
  const line = getLineControl(lineNum)
  line.SetHidden(false)

  const myLineFunction = () => {
    const [x1, y1, z1, x2, y2, z2] = endpointsProvider()
    const visible = drawLineBetween3DPoints(x1, y1, z1, x2, y2, z2, lineNum)
    line.SetHidden(!visible)
  }

  ACTIVE_LINE_FUNCTIONS[lineNum] = myLineFunction
  startPolling()
}

CRUTCH.RemoveLine = (lineNumArg) => {
  const lineNum = lineNumArg ?? 1

  const line = getLineControl(lineNum)
  line.SetHidden(true)

  delete ACTIVE_LINE_FUNCTIONS[lineNum]

  for (const [,] of pairs(ACTIVE_LINE_FUNCTIONS)) {
    return
  }
  stopPolling()
}
