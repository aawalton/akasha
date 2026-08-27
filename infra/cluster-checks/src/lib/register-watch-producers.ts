import { registerTunnelConfigRecipeTypes } from "../../../../../instructions/tools/lib/graph/producers/tunnel-config-recipe/register.ts"
import { tunnelConfigRecipeEdgeProducer } from "../../../../../instructions/tools/lib/graph/producers/tunnel-config-recipe/tunnel-config-recipe.edge.producer.ts"
import { tunnelConfigRecipeNodeProducer } from "../../../../../instructions/tools/lib/graph/producers/tunnel-config-recipe/tunnel-config-recipe.node.producer.ts"
import type { Engine } from "../../../../../instructions/tools/lib/graph/types.ts"
import { dockerfileRecipeEdgeProducer } from "../../../../../instructions/tools/lib/graph/producers/dockerfile-recipe/dockerfile-recipe.edge.producer"
import { dockerfileRecipeNodeProducer } from "../../../../../instructions/tools/lib/graph/producers/dockerfile-recipe/dockerfile-recipe.node.producer"
import { registerDockerfileRecipeTypes } from "../../../../../instructions/tools/lib/graph/producers/dockerfile-recipe/register"
import { fileNodeProducer } from "../../../../../instructions/tools/lib/graph/producers/file/file.node.producer"
import { registerFileNodeTypes } from "../../../../../instructions/tools/lib/graph/producers/file/register"
import { tsFileEdgeProducer } from "../../../../../instructions/tools/lib/graph/producers/file/ts-file/ts-file.edge.producer"
import { k8sSynthEdgeProducer } from "../../../../../instructions/tools/lib/graph/producers/k8s/k8s-synth.edge.producer"
import { k8sSynthNodeProducer } from "../../../../../instructions/tools/lib/graph/producers/k8s/k8s-synth.node.producer"
import { k8sEdgeProducer } from "../../../../../instructions/tools/lib/graph/producers/k8s/k8s.edge.producer"
import { k8sNodeProducer } from "../../../../../instructions/tools/lib/graph/producers/k8s/k8s.node.producer"
import { rbacEdgeProducer } from "../../../../../instructions/tools/lib/graph/producers/k8s/rbac.edge.producer"
import { registerK8sNodeTypes, registerK8sSynthEdgeTypes } from "../../../../../instructions/tools/lib/graph/producers/k8s/register"
import { packageContainsFileEdgeProducer } from "../../../../../instructions/tools/lib/graph/producers/package/package-contains-file.edge.producer"
import { packageEdgeProducer } from "../../../../../instructions/tools/lib/graph/producers/package/package.edge.producer"
import { packageNodeProducer } from "../../../../../instructions/tools/lib/graph/producers/package/package.node.producer"
import { registerPackageTypes } from "../../../../../instructions/tools/lib/graph/producers/package/register"
import { pipelineEdgeProducer } from "../../../../../instructions/tools/lib/graph/producers/pipeline/pipeline.edge.producer"
import { pipelineNodeProducer } from "../../../../../instructions/tools/lib/graph/producers/pipeline/pipeline.node.producer"
import { registerPipelineTypes } from "../../../../../instructions/tools/lib/graph/producers/pipeline/register"

export const registerWatchProducers = (engine: Engine): undefined => {
  registerPackageTypes(engine)
  registerK8sNodeTypes(engine)
  registerPipelineTypes(engine)
  registerFileNodeTypes(engine)
  registerK8sSynthEdgeTypes(engine)
  registerDockerfileRecipeTypes(engine)
  registerTunnelConfigRecipeTypes(engine)

  engine.registerProducer(packageNodeProducer)
  engine.registerProducer(packageEdgeProducer)
  engine.registerProducer(k8sNodeProducer)
  engine.registerProducer(k8sEdgeProducer)
  engine.registerProducer(rbacEdgeProducer)
  engine.registerProducer(pipelineNodeProducer)
  engine.registerProducer(pipelineEdgeProducer)
  engine.registerProducer(fileNodeProducer)
  engine.registerProducer(packageContainsFileEdgeProducer)
  engine.registerProducer(tsFileEdgeProducer)
  engine.registerProducer(k8sSynthNodeProducer)
  engine.registerProducer(k8sSynthEdgeProducer)
  engine.registerProducer(dockerfileRecipeNodeProducer)
  engine.registerProducer(dockerfileRecipeEdgeProducer)
  engine.registerProducer(tunnelConfigRecipeNodeProducer)
  engine.registerProducer(tunnelConfigRecipeEdgeProducer)
}
